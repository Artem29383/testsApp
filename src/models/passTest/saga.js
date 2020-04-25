// eslint-disable-next-line no-unused-vars
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { getTestForPassingTestApi } from 'api/api';
import {
  getTestData,
  setLoadDataTest,
  setLoading,
} from 'models/passTest/reducer';

function* fetchPassingTest(action) {
  try {
    const { data } = yield call(getTestForPassingTestApi, action.payload);
    yield put({
      type: setLoadDataTest.type,
      payload: data,
    });
    yield put({
      type: setLoading.type,
      payload: false,
    });
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSagaPassTest() {
  yield takeEvery(getTestData, fetchPassingTest);
}
