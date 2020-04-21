import { takeEvery, call, put } from '@redux-saga/core/effects';
import {
  DELETE_TEST,
  DEPLOY_TEST,
  FETCH_TEST,
  UPDATE_TEST,
} from 'models/test/action';
import {
  deleteFieldNameTestApi,
  deleteThisFilmApi,
  deployingTestApi,
  deployingTestNameApi,
  getTestDataApi,
  updateFieldNameTestApi,
  updateThisTestApi,
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
    yield call(deployingTestApi, payload);
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
    yield put({
      type: setLoad,
      payload: false,
    });
  } catch (e) {
    console.log(e);
  }
}

function* updateTest(action) {
  try {
    const { id, testName, entities, ids, created } = action.payload;
    yield put({
      type: setLoad,
      payload: true,
    });
    yield call(updateThisTestApi, { id, testName, entities, ids, created });
    yield call(updateFieldNameTestApi, { id, testName, created });
    yield put({
      type: setLoad,
      payload: false,
    });
    yield put(push('/tests'));
  } catch (e) {
    console.log(e);
  }
}

// eslint-disable-next-line require-yield
function* removeTest(action) {
  try {
    yield call(deleteThisFilmApi, action.payload);
    yield call(deleteFieldNameTestApi, action.payload);
    yield put(push('/tests'));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSagaTest() {
  yield takeEvery(DEPLOY_TEST, deployTest);
  yield takeEvery(FETCH_TEST, fetchTest);
  yield takeEvery(UPDATE_TEST, updateTest);
  yield takeEvery(DELETE_TEST, removeTest);
}
