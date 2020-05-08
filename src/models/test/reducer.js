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
      const { id, radioId } = payload;
      const checkedId = state.questions.entities[id].answer.ids.filter(
        qId => state.questions.entities[id].answer.entities[qId].isChecked
      );
      if (checkedId.length !== 0) {
        state.questions.entities[id].answer.entities[
          checkedId
        ].isChecked = false;
      }
      state.questions.entities[id].answer.entities[radioId].isChecked = true;
    },
    updateFieldAnswer(state, { payload }) {
      const { id, answerId, value } = payload;
      state.questions.entities[id].answer.entities[answerId].value = value;
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
      const { id, answerId } = payload;
      state.questions.entities[id].answer.entities = removePropFromObject(
        state.questions.entities[id].answer.entities,
        answerId
      );
      state.questions.entities[id].answer.ids = removeArrayElement(
        state.questions.entities[id].answer.ids,
        answerId
      );
    },
    toggleCheckBox(state, { payload }) {
      const { id, checkedId } = payload;
      state.questions.entities[id].answer.entities[checkedId].isChecked = !state
        .questions.entities[id].answer.entities[checkedId].isChecked;
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
    setDragAndDropArrayAnswers(state, { payload }) {
      const { questId, id, removeIndex, pasteDraggableId } = payload;
      const quests = state.questions.entities[questId];
      const copyIds = [...quests.answer.ids];
      copyIds.splice(removeIndex, 1);
      copyIds.splice(id, 0, pasteDraggableId);
      state.questions.entities[questId].answer.ids = copyIds;
    },
    setDragAndDropArrayQuests(state, { payload }) {
      state.questions.ids = payload;
    },
    setFetchTestData(state, { payload }) {
      Object.assign(state, payload);
    },
    setLoad(state, { payload }) {
      state.isLoad = payload;
    },
    createTest: state => state,
    getTest: state => state,
    updateTestById: state => state,
    removeTestById: state => state,
  },
});

export default testReducer.reducer;
export const {
  getTest,
  updateTestById,
  removeTestById,
  createTest,
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
  setDragAndDropArrayAnswers,
  setFetchTestData,
  setDragAndDropArrayQuests,
} = testReducer.actions;
