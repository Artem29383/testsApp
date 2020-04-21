import React from 'react';
import { ThemeProvider } from 'styled-components';
import useAuth from 'hooks/useAuth';
import theme from 'styles/theme';
import AppRoutes from 'components/AppRoutes/AppRoutes';
import Navigation from 'components/Navigation';
import useInit from 'hooks/useInit';
import { GlobalStyles } from 'styles/index';
import { Helmet } from 'react-helmet-async';
import config from 'config';
import S from './App.styled';

const App = () => {
  const isInit = useInit();
  const isAuth = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <Helmet {...config.app} />
      <GlobalStyles />
      {isInit && (
        <S.Content>
          {isAuth && <Navigation />}
          <AppRoutes />
        </S.Content>
      )}
    </ThemeProvider>
  );
};

export default App;
