import { createSelector } from '@reduxjs/toolkit';

const getError = state => state.user.msgError;

export const getErrorSelector = createSelector(getError, msgError => msgError);

export const getAuth = state => state.user.isAuth;

const getUserName = state => state.user.name;

const getIsAdmin = state => state.user.isAdmin;

export const getIsAdminSelector = createSelector(
  getIsAdmin,
  isAdmin => isAdmin
);

export const getInit = state => state.user.isInit;

export const getUserNameSelector = createSelector(getUserName, name => name);

const getErrorFetch = state => state.user.error;

export const getErrorSel = createSelector(getErrorFetch, error => error);
