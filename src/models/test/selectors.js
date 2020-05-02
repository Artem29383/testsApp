import { createSelector } from '@reduxjs/toolkit';

const getQuestions = state => state.test.questions.entities;

const getQuestionsIds = state => state.test.questions.ids;

export const getQuestionsSelector = createSelector(
  getQuestions,
  entities => entities
);

export const getQuestion = createSelector(
  getQuestions,
  (_, id) => id,
  (state, id) => state[id]
);

export const getQuestionsIdsSelector = createSelector(
  getQuestionsIds,
  ids => ids
);

const getTestName = state => state.test.testName;

export const getTestNameSelector = createSelector(
  getTestName,
  testName => testName
);

const getLoad = state => state.test.isLoad;

export const getLoadSelector = createSelector(getLoad, isLoad => isLoad);

const getCreatedData = state => state.test.created;

export const getCreatedDataSelector = createSelector(
  getCreatedData,
  created => created
);
