import { takeEvery, call, put } from '@redux-saga/core/effects';
import {
  deleteTestApi,
  createTestApi,
  getTestDataApi,
  updateTestApi,
} from 'api/api';
import { push } from 'connected-react-router';
import {
  createTest,
  getTest,
  removeTestById,
  setFetchTestData,
  setLoad,
  updateTestById,
} from 'models/test/reducer';

function* deployTest(action) {
  try {
    const { payload } = action;
    yield call(createTestApi, payload);
    yield put(push('/tests'));
  } catch (e) {
    console.log(e);
  }
}

function* fetchTest(action) {
  try {
    const { data } = yield call(getTestDataApi, action.payload);
    yield put({
      type: setFetchTestData.type,
      payload: data,
    });
  } catch (e) {
    console.error(e);
  }
  yield put({
    type: setLoad.type,
    payload: false,
  });
}

function* updateTest(action) {
  try {
    const { id, testName, entities, ids, created } = action.payload;
    yield put({
      type: setLoad.type,
      payload: true,
    });
    yield call(updateTestApi, { id, testName, entities, ids, created });
    yield put({
      type: setLoad.type,
      payload: false,
    });
    yield put(push('/tests'));
  } catch (e) {
    console.error(e);
  }
}

function* removeTest(action) {
  try {
    yield call(deleteTestApi, action.payload);
    yield put(push('/tests'));
  } catch (e) {
    console.error(e);
  }
}

export default function* rootSagaTest() {
  yield takeEvery(createTest, deployTest);
  yield takeEvery(getTest, fetchTest);
  yield takeEvery(updateTestById, updateTest);
  yield takeEvery(removeTestById, removeTest);
}
