import { routerMiddleware } from 'connected-react-router';

import createSagaMiddleware, { END } from 'redux-saga';

import { createRootReducer } from 'models';
import { configureStore } from '@reduxjs/toolkit';

export default history => {
  const sagaMiddleware = createSagaMiddleware();
  const isDev = process.env.NODE_ENV === 'development';

  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [sagaMiddleware, routerMiddleware(history)],
    devTools: isDev,
  });

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};
