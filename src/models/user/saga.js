import { call, takeEvery, put } from 'redux-saga/effects';
import { authApi } from 'api/api';
import {
  loginUser,
  loginUserFailure,
  loginUserSuccess,
} from 'models/user/reducer';

function* signIn(action) {
  try {
    const { login, password } = action.payload;
    const { data } = yield call(authApi);
    const user = data.find(u => u.login === login && u.password === password);
    const isAuth = Boolean(user);
    if (!isAuth) throw new Error('Неверные данные для входа...');
    localStorage.setItem(
      'user',
      JSON.stringify({ isAuth, name: user.login, isAdmin: user.isAdmin })
    );
    yield put({
      type: loginUserSuccess.type,
      payload: { name: user.login, isAuth },
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
