import { createSelector } from '@reduxjs/toolkit';

const getLoad = state => state.passingTest.isLoading;

export const getLoadSelector = createSelector(getLoad, isLoading => isLoading);

const getEntitiesQuestions = state => state.passingTest.questions.entities;

export const getEntitiesQuestionsSel = createSelector(
  getEntitiesQuestions,
  entities => entities
);

const getState = state => state.passingTest;

export const passingTestSelector = createSelector(getState, state => state);
