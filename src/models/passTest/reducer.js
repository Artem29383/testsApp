import { createSlice } from '@reduxjs/toolkit';
import { questionVariable } from 'styles/constants';
/* eslint-disable no-param-reassign */

const initialState = {
  id: null,
  questions: {
    entities: {},
    ids: [],
  },
  currentQuestionId: null,
  testName: null,
  isLoading: true,
  errorMessage: '',
  answers: {},
};

const passTestReducer = createSlice({
  name: 'passingTest',
  initialState,
  reducers: {
    reset: () => initialState,
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setLoadDataTest(state, { payload }) {
      const { id, testName, questions } = payload;
      state.id = id;
      state.questions = questions;
      questions.ids.forEach(q => {
        questions.entities[q].isValid = true;
      });
      state.testName = testName;
    },
    setDataCurrentQuest(state, { payload }) {
      const { id } = payload;
      state.currentQuestionId = id;
      if (!state.answers[id]) {
        if (state.questions.entities[id].type === questionVariable.some) {
          state.answers[id] = {
            answer: {},
          };
        } else {
          state.answers[id] = {
            answer: [],
          };
        }
      }
    },
    toggleChecked(state, { payload }) {
      const { questId, radioId } = payload;
      state.answers[questId].answer = [radioId];
    },
    toggleCheckBox(state, { payload }) {
      const { questId, checkBoxId } = payload;
      state.answers[questId].answer[checkBoxId] = !state.answers[questId]
        .answer[checkBoxId];
    },
    setNumericAnswer(state, { payload }) {
      const { questId, value, numberId } = payload;
      state.answers[questId].answer = [value, numberId];
    },
    setErrorMessage(state, { payload }) {
      state.errorMessage = payload;
    },
    setStatusInvalid(state, { payload }) {
      payload.forEach(id => {
        state.questions.entities[id].isValid = false;
      });
    },
    setStatusValid(state, { payload }) {
      state.questions.entities[payload].isValid = true;
    },
    getTestData: state => state,
  },
});

export default passTestReducer.reducer;
export const {
  setLoading,
  setLoadDataTest,
  setDataCurrentQuest,
  toggleChecked,
  reset,
  setNumericAnswer,
  toggleCheckBox,
  getTestData,
  setStatusInvalid,
  setStatusValid,
} = passTestReducer.actions;
