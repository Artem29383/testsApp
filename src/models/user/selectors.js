import { createSelector } from '@reduxjs/toolkit';

const getError = state => state.user.msgError;

export const errorSelector = createSelector(getError, msgError => msgError);

export const getAuth = state => state.user.isAuth;

const getUserName = state => state.user.name;

const getIsAdmin = state => state.user.isAdmin;

export const adminStatusSelector = createSelector(
  getIsAdmin,
  isAdmin => isAdmin
);

export const getInit = state => state.user.isInit;

export const userNameSelector = createSelector(getUserName, name => name);

const getErrorFetch = state => state.user.error;

export const fetchErrorSelector = createSelector(getErrorFetch, error => error);
