import { takeEvery, call, put } from '@redux-saga/core/effects';
import { getTestForPassingTestApi } from 'api/api';
import {
  getTestData,
  setLoadDataTest,
  setLoading,
} from 'models/passTest/reducer';
import { setError } from 'models/user/reducer';

function* fetchPassingTest(action) {
  try {
    const { data } = yield call(getTestForPassingTestApi, action.payload);
    yield put({
      type: setLoadDataTest.type,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: setError.type,
      payload: {
        message: e.message,
        idError: 'passingTest',
      },
    });
  }
  yield put({
    type: setLoading.type,
    payload: false,
  });
}

export default function* rootSagaPassTest() {
  yield takeEvery(getTestData, fetchPassingTest);
}
