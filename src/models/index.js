import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

/* reducers */
import userReducer from './user/reducer';
import testsReducer from './tests/reducer';
/* reducers */

/* sagas */
import userSagas from './user/saga';
import rootSagaTests from './tests/saga';
/* sagas */

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    tests: testsReducer,
  });

export const rootSaga = function* rootSaga() {
  yield all([userSagas(), rootSagaTests()]);
};
