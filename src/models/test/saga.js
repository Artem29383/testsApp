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
import { setError } from 'models/user/reducer';
import routes from 'constants/routes';

function* deployTest(action) {
  try {
    const { payload } = action;
    yield call(createTestApi, payload);
    yield put(push(routes.testPage));
  } catch (e) {
    yield put({
      type: setError.type,
      payload: {
        message: e.message,
        idError: 'deployTest',
      },
    });
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
    yield put({
      type: setError.type,
      payload: {
        message: e.message,
        idError: 'fetchTest',
      },
    });
  }
  yield put({
    type: setLoad.type,
    payload: false,
  });
}

function* updateTest(action) {
  try {
    const { id, testName, entities, ids, created } = action.payload;
    yield call(updateTestApi, { id, testName, entities, ids, created });
    yield put(push(routes.testPage));
  } catch (e) {
    yield put({
      type: setError.type,
      payload: {
        message: e.message,
        idError: 'updateTest',
      },
    });
  }
}

function* removeTest(action) {
  try {
    yield call(deleteTestApi, action.payload);
    yield put(push('/tests'));
  } catch (e) {
    yield put({
      type: setError.type,
      payload: {
        message: e.message,
        idError: 'removeTest',
      },
    });
  }
}

export default function* rootSagaTest() {
  yield takeEvery(createTest, deployTest);
  yield takeEvery(getTest, fetchTest);
  yield takeEvery(updateTestById, updateTest);
  yield takeEvery(removeTestById, removeTest);
}
