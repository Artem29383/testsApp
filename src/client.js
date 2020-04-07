import React from 'react';
import { render, hydrate, unmountComponentAtNode } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { HelmetProvider } from 'react-helmet-async';

import { rootSaga } from 'models';
import routes from './routes';
import configStore from './store';

import './components/App';

/* Get initial state from server side rendering */
const history = createBrowserHistory();
const store = configStore(history);

/* Start saga middleware */
store.runSaga(rootSaga);

const renderDom = process.env.APP_ENV === 'development' ? render : hydrate;
const mountNode = document.getElementById('root');

const renderApp = () => {
  unmountComponentAtNode(mountNode);
  const App = require('./components/App').default;

  renderDom(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HelmetProvider>
          <App routes={routes} />
        </HelmetProvider>
      </ConnectedRouter>
    </Provider>,
    mountNode
  );
};

if (module.hot) {
  module.hot.accept();
}

renderApp();
