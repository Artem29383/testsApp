import { call, takeEvery, put } from 'redux-saga/effects';
import { getUsersCurrentApi, logoutUserApi, signInApi } from 'api/api';
import {
  checkAuthUser,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  setInit,
  logoutUser,
  logOutUser,
} from 'models/user/reducer';
import { setLoading, setTests } from 'models/tests/reducer';
import { push } from 'connected-react-router';
import routes from 'constants/routes';

function* signIn(action) {
  try {
    const { login, password } = action.payload;
    const { data } = yield call(signInApi, login, password);
    const isAuth = Boolean(data);
    if (!isAuth) throw new Error('Неверные данные для входа...');
    yield put({
      type: loginUserSuccess.type,
      payload: { name: data.username, isAuth, isAdmin: data.is_admin },
    });
  } catch (e) {
    yield put({
      type: loginUserFailure.type,
      payload: e.message,
    });
  }
}

function* logOut() {
  try {
    yield call(logoutUserApi);
    yield put({
      type: setTests.type,
      payload: {
        entities: {},
        ids: [],
      },
    });
    yield put({
      type: logoutUser.type,
    });
  } catch (e) {
    console.error(e);
  }
  yield put({
    type: setLoading.type,
    payload: false,
  });
}

function* getCurrentUser() {
  try {
    const { data } = yield call(getUsersCurrentApi);
    yield put({
      type: loginUserSuccess.type,
      payload: { name: data.username, isAuth: true, isAdmin: data.is_admin },
    });
  } catch (e) {
    yield put(push(routes.auth));
  }
  yield put({
    type: setInit.type,
    payload: true,
  });
}

export default function* rootSagaAuth() {
  yield takeEvery(loginUser, signIn);
  yield takeEvery(checkAuthUser, getCurrentUser);
  yield takeEvery(logOutUser, logOut);
}
