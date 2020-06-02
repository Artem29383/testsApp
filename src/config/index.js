const development = require('./development');
const production = require('./production');
const staging = require('./staging');

const configs = {
  development,
  production,
  staging,
};

export default {
  port: 3333,
  defaultLocale: 'en',
  htmlMinifier: {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  },
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React tests app',
    link: [
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Asap&display=swap&subset=latin-ext',
      },
    ],
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      },
    ],
  },
  ...configs[process.env.APP_ENV],
};
