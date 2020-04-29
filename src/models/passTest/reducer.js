import { createSlice } from '@reduxjs/toolkit';
import { removePropFromObject } from 'utils/removePropFromObject';
import { questionVariable } from 'styles/constants';
/* eslint-disable no-param-reassign */

const initialState = {
  id: null,
  questions: {
    entities: {},
    ids: [],
  },
  currentQuestionId: null,
  type: null,
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
      state.currentQuestionId = payload.id;
      state.type = payload.type;
      // eslint-disable-next-line no-prototype-builtins
      if (!state.answers.hasOwnProperty(payload.id)) {
        if (payload.type === questionVariable.some) {
          state.answers[payload.id] = {
            answer: {},
            type: payload.type,
          };
        } else {
          state.answers[payload.id] = {
            answer: [],
            type: payload.type,
          };
        }
      }
    },
    toggleChecked(state, { payload }) {
      const { qId, rId } = payload;
      state.answers[qId].answer = [rId];
    },
    toggleCheckBox(state, { payload }) {
      const { qId, cId } = payload;
      if (state.answers[qId].answer[cId]) {
        state.answers[qId].answer = removePropFromObject(
          state.answers[qId].answer,
          cId
        );
      } else {
        state.answers[qId].answer[cId] = cId;
      }
    },
    setNumericAnswer(state, { payload }) {
      const { qId, value, nId } = payload;
      state.answers[qId].answer = [value, nId];
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
