import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';

const getQuestions = state => state.test.questions.entities;

const getQuestionsIds = state => state.test.questions.ids;

export const getQuestionsSelector = createSelector(
  getQuestions,
  entities => entities
);

export const getQuestionsIdsSelector = createSelector(
  getQuestionsIds,
  ids => ids
);

export const getQuestSelector = createSelector(
  [getQuestionsSelector, getQuestionsIdsSelector],
  entities => {
    return memoize(dinamId => {
      return entities[dinamId];
    });
  }
);

export const getErrorMsgSelector = createSelector(
  [getQuestionsSelector, getQuestionsIdsSelector],
  entities => {
    return memoize(dinamId => {
      return entities[dinamId].errorMsg;
    });
  }
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
