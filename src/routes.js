import routes from 'constants/routes';
import AuthPage from 'pages/AuthPage';
import TestPage from 'pages/TestPage';
import CreateEditTestPage from 'pages/CreateEditTestPage';
import PassingTestPage from 'pages/PassingTestPage';
import EditTestPage from 'pages/EditTestPage';
import ErrorPage from 'pages/ErrorPage';

export default [
  {
    path: routes.auth,
    exact: true,
    component: AuthPage,
    isAuth: false,
  },
  {
    path: routes.edit,
    exact: true,
    component: TestPage,
    isAuth: true,
    isAdmin: true,
  },
  {
    path: routes.testPage,
    exact: true,
    component: TestPage,
    isAuth: true,
    isAdmin: false,
  },
  {
    path: routes.create,
    exact: true,
    component: CreateEditTestPage,
    isAuth: true,
    isAdmin: true,
  },
  {
    path: `${routes.passing}/:id`,
    exact: true,
    component: PassingTestPage,
    isAuth: true,
    isAdmin: false,
  },
  {
    path: `${routes.edit}/:id`,
    exact: true,
    component: EditTestPage,
    isAuth: true,
    isAdmin: true,
  },
  {
    path: routes.error,
    exact: true,
    component: ErrorPage,
    isAuth: false,
    isAdmin: false,
  },
];
