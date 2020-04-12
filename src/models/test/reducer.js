import { createSlice } from '@reduxjs/toolkit';
import { removePropFromObject } from 'utils/removePropFromObject';
import { removeArrayElement } from 'utils/removeArrayElement';
/* eslint-disable no-param-reassign */

const testReducer = createSlice({
  name: 'test',
  initialState: {
    questions: {
      entities: {},
      ids: [],
    },
    testName: 'Очередной тест',
    isLoad: true,
    created: null,
  },
  reducers: {
    setQuestName(state, { payload }) {
      state.questions.entities[payload.id].questName = payload.questionName;
    },
    deleteTest(state) {
      state.questions = {
        entities: {},
        ids: [],
      };
      state.testName = 'Очередной тест';
      state.created = null;
      state.isLoad = true;
    },
    pushAnswer(state, { payload }) {
      const { id, qId, answer } = payload;
      state.questions.entities[id].answer.entities[qId] = answer;
      state.questions.entities[id].answer.ids.push(qId);
    },
    pushQuestion(state, { payload }) {
      const { id, answer, questName } = payload;
      state.questions.entities[id] = { answer, questName };
      state.questions.ids.push(id);
    },
    toggleChecked(state, { payload }) {
      const { id, radioId, checkedId } = payload;
      if (checkedId.length !== 0) {
        state.questions.entities[id].answer.entities[
          checkedId
        ].isChecked = false;
      }
      state.questions.entities[id].answer.entities[radioId].isChecked = true;
    },
    updateFieldAnswer(state, { payload }) {
      const { id, qId, value } = payload;
      state.questions.entities[id].answer.entities[qId].value = value;
    },
    setNumericAnswer(state, { payload }) {
      const { id, qId, value, isChecked, type, isValid, errorMsg } = payload;
      state.questions.entities[id].type = type;
      state.questions.entities[id].isValid = isValid;
      state.questions.entities[id].errorMsg = errorMsg;
      state.questions.entities[id].answer.entities = {
        [qId]: { id: qId, value, isChecked },
      };
      state.questions.entities[id].answer.ids = [qId];
    },
    setInitialRadioOrCheckBox(state, { payload }) {
      const { id, qId, answer, type, isValid, errorMsg } = payload;
      state.questions.entities[id].type = type;
      state.questions.entities[id].isValid = isValid;
      state.questions.entities[id].errorMsg = errorMsg;
      state.questions.entities[id].answer.entities = {
        [qId]: answer,
      };
      state.questions.entities[id].answer.ids = [qId];
    },
    removeAnswerFromRadioOrCheckBox(state, { payload }) {
      const { id, qId } = payload;
      state.questions.entities[id].answer.entities = removePropFromObject(
        state.questions.entities[id].answer.entities,
        qId
      );
      state.questions.entities[id].answer.ids = removeArrayElement(
        state.questions.entities[id].answer.ids,
        qId
      );
    },
    toggleCheckBox(state, { payload }) {
      const { id, qId, isChecked } = payload;
      state.questions.entities[id].answer.entities[qId].isChecked = !isChecked;
    },
    removeQuest(state, { payload }) {
      state.questions.entities = removePropFromObject(
        state.questions.entities,
        payload
      );
      state.questions.ids = removeArrayElement(state.questions.ids, payload);
    },
    setTestName(state, { payload }) {
      state.testName = payload;
    },
    setValidQuestion(state, { payload }) {
      state.questions.entities[payload].isValid = true;
      state.questions.entities[payload].errorMsg = null;
    },
    setQuestError(state, { payload }) {
      const { id, errorMsg } = payload;
      state.questions.entities[id].errorMsg = errorMsg;
      state.questions.entities[id].isValid = false;
    },
    setDragAndDropArray(state, { payload }) {
      const { id, ids } = payload;
      state.questions.entities[id].answer.ids = ids;
    },
    setFetchTestData(state, { payload }) {
      const { testName, questions, created } = payload;
      state.testName = testName;
      state.questions = questions;
      state.created = created;
    },
    setLoad(state, { payload }) {
      state.isLoad = payload;
    },
  },
});

export default testReducer.reducer;
export const {
  setQuestName,
  pushAnswer,
  toggleChecked,
  pushQuestion,
  updateFieldAnswer,
  deleteTest,
  setNumericAnswer,
  setInitialRadioOrCheckBox,
  removeAnswerFromRadioOrCheckBox,
  toggleCheckBox,
  removeQuest,
  setTestName,
  setValidQuestion,
  setQuestError,
  setLoad,
  setDragAndDropArray,
  setFetchTestData,
} = testReducer.actions;
