import { call, takeEvery, put } from 'redux-saga/effects';
import { signInApi } from 'api/api';
import {
  loginUser,
  loginUserFailure,
  loginUserSuccess,
} from 'models/user/reducer';

function* signIn(action) {
  try {
    const { login, password } = action.payload;
    const { data } = yield call(signInApi, login, password);
    const isAuth = Boolean(data);
    if (!isAuth) throw new Error('Неверные данные для входа...');
    localStorage.setItem(
      'user',
      JSON.stringify({ isAuth, name: data.username, isAdmin: data.is_admin })
    );
    yield put({
      type: loginUserSuccess.type,
      payload: { name: data.username, isAuth },
    });
  } catch (e) {
    yield put({
      type: loginUserFailure.type,
      payload: e.message,
    });
  }
}

export default function* rootSagaAuth() {
  yield takeEvery(loginUser, signIn);
}
