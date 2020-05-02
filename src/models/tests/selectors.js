import { createSelector } from '@reduxjs/toolkit';
import { denormalize, schema } from 'normalizr';
import memoize from 'lodash.memoize';

const getLoading = state => state.tests.isLoading;

const getIds = state => state.tests.tests.ids;

const getTests = state => state.tests.tests.entities;

export const getIsInit = state => state.tests.isInit;

const getCurrentTest = state => state.tests.currentTest;

export const getCurrentTestSelector = createSelector(
  getCurrentTest,
  currentTest => currentTest
);

export const getTestsSelector = createSelector(getTests, entities => entities);

export const getLoadingSelector = createSelector(
  getLoading,
  isLoading => isLoading
);

export const getDenormalizedDataSelector = createSelector(
  [getTests, getIds],
  (entities, ids) => {
    return memoize(field => {
      const schemas = new schema.Entity(field);
      const mySchema = { [field]: [schemas] };
      const data = { [field]: entities };
      return denormalize({ [field]: ids }, mySchema, data);
    });
  }
);
