import { takeEvery, call, put } from '@redux-saga/core/effects';
import {
  DELETE_TEST,
  DEPLOY_TEST,
  FETCH_TEST,
  UPDATE_TEST,
} from 'models/test/action';
import {
  deleteFieldNameTestApi,
  deleteTestApi,
  createTestApi,
  deployingTestNameApi,
  getTestDataApi,
  updateFieldNameTestApi,
  updateTestApi,
} from 'api/api';
import { push } from 'connected-react-router';
import { setFetchTestData, setLoad } from 'models/test/reducer';

function* deployTest(action) {
  try {
    const { payload } = action;
    const testName = {
      id: payload.id,
      testName: payload.testName,
      created: payload.created,
    };
    yield call(deployingTestNameApi, testName);
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
      type: setFetchTestData,
      payload: data,
    });
  } catch (e) {
    console.error(e);
  }
  yield put({
    type: setLoad,
    payload: false,
  });
}

function* updateTest(action) {
  try {
    const { id, testName, entities, ids, created } = action.payload;
    yield put({
      type: setLoad,
      payload: true,
    });
    yield call(updateTestApi, { id, testName, entities, ids, created });
    yield call(updateFieldNameTestApi, { id, testName, created });
    yield put({
      type: setLoad,
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
    yield call(deleteFieldNameTestApi, action.payload);
    yield put(push('/tests'));
  } catch (e) {
    console.error(e);
  }
}

export default function* rootSagaTest() {
  yield takeEvery(DEPLOY_TEST, deployTest);
  yield takeEvery(FETCH_TEST, fetchTest);
  yield takeEvery(UPDATE_TEST, updateTest);
  yield takeEvery(DELETE_TEST, removeTest);
}
