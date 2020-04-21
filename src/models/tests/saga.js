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
import { push } from 'connected-react-router';

function* getTest() {
  try {
    const { data } = yield call(getTestsApi);
    const dataNormalized = normalized(data, 'tests');
    yield put({
      type: setTests,
      payload: {
        entities: dataNormalized.entities.tests,
        ids: dataNormalized.result,
      },
    });
  } catch (e) {
    console.error(e);
  }
  yield put({
    type: setLoading,
    payload: false,
  });
}

function* getCurrentTest(action) {
  try {
    const { data } = yield call(getTestApi, action.payload.id);
    yield put({
      type: setCurrentTest,
      payload: data,
    });
  } catch (e) {
    yield put(push(action.payload.isAdmin ? '/edit' : '/tests'));
  }
  yield put({
    type: setLoading,
    payload: false,
  });
}

export default function* rootSagaTests() {
  yield takeEvery(getAllTests, getTest);
  yield takeEvery(getTestById, getCurrentTest);
}
