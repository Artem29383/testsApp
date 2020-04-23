import { takeEvery, call, put } from '@redux-saga/core/effects';
import { getTestApi, getTestsApi } from 'api/api';
import { normalized } from 'utils/normalized';
import {
  getAllTests,
  getTestById,
  setCurrentTest,
  setLoading,
  setTests,
} from 'models/tests/reducer';
import { setError } from 'models/user/reducer';
import { push } from 'connected-react-router';
import routes from 'constants/routes';

function* getTest() {
  try {
    const { data } = yield call(getTestsApi);
    const dataNormalized = normalized(data, 'tests');
    yield put({
      type: setTests.type,
      payload: {
        entities: dataNormalized.entities.tests,
        ids: dataNormalized.result,
      },
    });
  } catch (e) {
    yield put({
      type: setError.type,
      payload: {
        message: e.message,
        idError: 'getTests',
      },
    });
  }
  yield put({
    type: setLoading.type,
    payload: false,
  });
}

function* getCurrentTest(action) {
  try {
    const { data } = yield call(getTestApi, action.payload.id);
    yield put({
      type: setCurrentTest.type,
      payload: data,
    });
  } catch (e) {
    yield put(push(action.payload.isAdmin ? routes.edit : routes.testPage));
  }
  yield put({
    type: setLoading.type,
    payload: false,
  });
}

export default function* rootSagaTests() {
  yield takeEvery(getAllTests, getTest);
  yield takeEvery(getTestById, getCurrentTest);
}
