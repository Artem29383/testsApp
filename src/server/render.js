import memoryCache from 'memory-cache';
import { matchRoutes } from 'react-router-config';
import { createMemoryHistory } from 'history';
import { minify } from 'html-minifier';

import routes from '../routes';
import renderHtml from '../utils/renderHtml';
import renderHead from '../utils/renderHead';
import configureStore from '../store';
import loadBranchData from './loadBranchData';
import config from '../config';

/* eslint-disable import/extensions */
import assets from '../../public/webpack-assets.json';
/* eslint-disable import/extensions */

const isSSR = process.env.APP_MODE === 'ssr';
const isDev = process.env.APP_ENV === 'development';

const renderApp =
  process.env.APP_MODE === 'ssr'
    ? require('../utils/renderApp').default
    : () => '';

export default async route => {
  const cache = memoryCache.get(route);

  if (cache == null) {
    const history = createMemoryHistory();
    const store = configureStore(history, {});
    const branch = matchRoutes(routes, route);

    if (!isDev && isSSR) {
      await loadBranchData(store, branch);
    }

    const helmetContext = {};

    const htmlContent = renderApp(route, store, helmetContext);

    const head = isSSR
      ? {
          htmlAttributes: helmetContext.helmet.htmlAttributes.toString(),
          title: helmetContext.helmet.title.toString(),
          base: helmetContext.helmet.base.toString(),
          meta: helmetContext.helmet.meta.toString(),
          link: helmetContext.helmet.link.toString(),
          script: helmetContext.helmet.script.toString(),
        }
      : renderHead();

    const StoreWithoutRouter = Object.assign({}, store.getState());
    delete StoreWithoutRouter['router'];

    const html = renderHtml(
      head,
      isDev ? { js: '/main.js' } : assets,
      /* do not include rendered string to html in development mode to allow hmr */
      isDev ? '' : htmlContent,
      /* omit redux router part from the initial state */
      StoreWithoutRouter
    );

    if (branch.length && branch[0].route.cache) {
      cache.put(route, isDev ? html : minify(html));
    }

    return Promise.resolve(isDev ? html : minify(html, config.htmlMinifier));
  }

  return Promise.resolve(cache.get(route));
};
