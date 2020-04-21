import { createSlice } from '@reduxjs/toolkit';
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
  getAllTests,
  getTestById,
} = testsReducer.actions;
