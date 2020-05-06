import { createSelector } from '@reduxjs/toolkit';

const getTests = state => state.tests.tests.entities;

export const getIsInit = state => state.tests.isInit;

export const testsSelector = createSelector(getTests, entities => entities);

const getIds = state => state.tests.tests.ids;

const getAllTests = state => state.tests;

export const allTestsSelector = createSelector(getAllTests, state => state);

export const getFilteredSelector = createSelector(
  getIds,
  getTests,
  (_, value) => value,
  (ids, tests, value) =>
    ids.filter(id =>
      tests[id].testName.toLowerCase().includes(value.toLowerCase())
    )
);
