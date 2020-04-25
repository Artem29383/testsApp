import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';

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
  [getEntitiesQuestions, getIdsQuestions],
  (entities, ids) => {
    return memoize(index => {
      return entities[ids[index]];
    });
  }
);

const getEntitiesCurrentQuest = state =>
  state.passingTest.currentQuestForPassing.entities;

export const getAnswerOptionsQuSel = createSelector(
  getEntitiesCurrentQuest,
  entities => entities
);

const getIdsCurrentQuest = state =>
  state.passingTest.currentQuestForPassing.ids;

export const getIdsAnswerOptionsQuSel = createSelector(
  getIdsCurrentQuest,
  ids => ids
);

const getUserAnswer = state =>
  state.passingTest.currentQuestForPassing.userAnswer;

export const getUserAnswerSel = createSelector(
  getUserAnswer,
  userAnswer => userAnswer
);

const getError = state => state.passingTest.errorMessage;

export const getErrorSel = createSelector(
  getError,
  errorMessage => errorMessage
);

const getAllUserAnsweredId = state =>
  state.passingTest.allCorrectUserAnswQuest.ids;

export const getAllUserAnsweredIdSel = createSelector(
  getAllUserAnsweredId,
  ids => ids
);

const getAllUserAnsweredEntities = state =>
  state.passingTest.allCorrectUserAnswQuest.entities;

export const getAllUserAnsweredEntitiesSel = createSelector(
  getAllUserAnsweredEntities,
  entities => entities
);
