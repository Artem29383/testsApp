import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

/* reducers */
import userReducer from './user/reducer';
import testsReducer from './tests/reducer';
import testReducer from './test/reducer';
import passTestReducer from './passTest/reducer';
/* reducers */

/* sagas */
import userSagas from './user/saga';
import rootSagaTest from './test/saga';
import rootSagaTests from './tests/saga';
import rootSagaPassTest from './passTest/saga';
/* sagas */

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    tests: testsReducer,
    test: testReducer,
    passingTest: passTestReducer,
  });

export const rootSaga = function* rootSaga() {
  yield all([userSagas(), rootSagaTests(), rootSagaTest(), rootSagaPassTest()]);
};
