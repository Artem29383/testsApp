import { createSelector } from '@reduxjs/toolkit';

const getQuestions = state => state.test.questions.entities;

const getQuestionsIds = state => state.test.questions.ids;

export const questionsSelector = createSelector(
  getQuestions,
  entities => entities
);

export const questionsIdsSelector = createSelector(getQuestionsIds, ids => ids);

const getTestName = state => state.test.testName;

export const testNameSelector = createSelector(
  getTestName,
  testName => testName
);

export const questSelector = createSelector(
  getQuestions,
  (_, id) => id,
  (state, id) => state[id]
);

const getLoad = state => state.test.isLoad;

export const loadSelector = createSelector(getLoad, isLoad => isLoad);

const getCreatedData = state => state.test.created;

export const createdDataSelector = createSelector(
  getCreatedData,
  created => created
);
