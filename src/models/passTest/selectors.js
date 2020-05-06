import { createSelector } from '@reduxjs/toolkit';

const getEntitiesQuestions = state => state.passingTest.questions.entities;

export const entitiesQuestionsSelector = createSelector(
  getEntitiesQuestions,
  entities => entities
);

const getState = state => state.passingTest;

export const passingTestSelector = createSelector(getState, state => state);
