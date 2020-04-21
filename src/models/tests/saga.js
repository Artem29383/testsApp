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
    yield put({
      type: setLoading,
      payload: false,
    });
  } catch (e) {
    console.log(e);
  }
}

function* getCurrentTest(action) {
  try {
    const { data } = yield call(getTestApi, action.payload.id);
    yield put({
      type: setCurrentTest,
      payload: data,
    });
    yield put({
      type: setLoading,
      payload: false,
    });
  } catch (e) {
    yield put(push(action.payload.isAdmin ? '/edit' : '/tests'));
  }
}

export default function* rootSagaTests() {
  yield takeEvery(getAllTests, getTest);
  yield takeEvery(getTestById, getCurrentTest);
}
