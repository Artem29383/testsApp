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
    // eslint-disable-next-line array-callback-return,consistent-return
    const user = data.filter(u => {
      if (u.login === login && u.password === password) return u;
    });
    const isAuth = Boolean(user.length);
    if (!isAuth) throw new Error('Неверные данные для входа...');
    localStorage.setItem(
      'user',
      JSON.stringify({ isAuth, name: user[0].login, isAdmin: user[0].isAdmin })
    );
    yield put({
      type: loginUserSuccess,
      payload: { name: user[0].login, isAuth },
    });
  } catch (e) {
    yield put({
      type: loginUserFailure,
      payload: e.message,
    });
  }
}

export default function* rootSagaAuth() {
  yield takeEvery(loginUser, signIn);
}
