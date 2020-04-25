import { createSlice } from '@reduxjs/toolkit';
import { removePropFromObject } from 'utils/removePropFromObject';
import { removeArrayElement } from 'utils/removeArrayElement';
/* eslint-disable no-param-reassign */

const testsReducer = createSlice({
  name: 'tests',
  initialState: {
    tests: {
      entities: [],
      ids: [],
    },
    isLoading: false,
    currentTest: {},
  },
  reducers: {
    updateTestName(state, { payload }) {
      const { id, testName } = payload;
      state.tests.entities[id].testName = testName;
    },
    removeTestField(state, { payload }) {
      state.tests.entities = removePropFromObject(
        state.tests.entities,
        payload
      );
      state.tests.ids = removeArrayElement(state.tests.ids, payload);
    },
    addNewTestField(state, { payload }) {
      state.tests.entities[payload.id] = payload;
      state.tests.ids.push(payload.id);
    },
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setTests(state, { payload }) {
      state.tests = payload;
    },
    setCurrentTest(state, { payload }) {
      state.currentTest = payload;
    },
    getAllTests: state => state,
    getTestById: state => state,
  },
});

export default testsReducer.reducer;
export const {
  setLoading,
  setTests,
  setCurrentTest,
  removeTestField,
  getAllTests,
  getTestById,
  updateTestName,
  addNewTestField,
} = testsReducer.actions;
