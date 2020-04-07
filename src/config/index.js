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
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      {
        name: 'description',
        content: 'The best react universal starter boilerplate in the world.',
      },
    ],
  },
  ...configs[process.env.APP_ENV],
};
