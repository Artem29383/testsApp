import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
import routes from 'constants/routes';
import useSelector from 'hooks/useSelector';
import { getAuth, getIsAdminSelector } from 'models/user/selectors';
import routers from '../../routes';

const appRoutes = () => {
  const isAdminMode = useSelector(getIsAdminSelector);
  const isAuthApp = useSelector(getAuth);
  if (!isAuthApp) {
    return (
      <Switch>
        <Route exact path={routes.auth} render={() => <AuthPage />} />
        <Redirect to={routes.auth} />
      </Switch>
    );
  }
  return (
    <Switch>
      {/* eslint-disable-next-line array-callback-return,consistent-return */}
      {routers.map(({ path, exact, component: Component, isAdmin, isAuth }) => {
        if (isAuth) {
          if (isAdmin === isAdminMode) {
            return (
              <Route
                key={path}
                exact={exact}
                path={path}
                render={props => <Component {...props} />}
              />
            );
          }
          if (isAdmin === false) {
            return (
              <Route
                key={path}
                exact={exact}
                path={path}
                render={props => <Component {...props} />}
              />
            );
          }
        }
      })}
      <Redirect to={routes.testPage} />
    </Switch>
  );
};

export default memo(appRoutes);
