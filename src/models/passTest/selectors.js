import { createSelector } from '@reduxjs/toolkit';

const getLoad = state => state.passingTest.isLoading;

export const getLoadSelector = createSelector(getLoad, isLoading => isLoading);

const getTestName = state => state.passingTest.testName;

export const getTestNameSelector = createSelector(
  getTestName,
  testName => testName
);

const getIdsQuestions = state => state.passingTest.questions.ids;

export const getIdsQuestionsSel = createSelector(getIdsQuestions, ids => ids);

const getEntitiesQuestions = state => state.passingTest.questions.entities;

export const getEntitiesQuestionsSel = createSelector(
  getEntitiesQuestions,
  entities => entities
);
export const getQuestSelector = createSelector(
  getEntitiesQuestions,
  getIdsQuestions,
  (_, index) => index,
  (entities, ids, index) => entities[ids[index]]
);

export const getAnswersQuest = state => state.passingTest.answers;

export const getAnswerQuestSel = createSelector(
  getAnswersQuest,
  (_, id) => id,
  (answers, id) => answers[id]
);

const getError = state => state.passingTest.errorMessage;

export const getErrorSel = createSelector(
  getError,
  errorMessage => errorMessage
);
