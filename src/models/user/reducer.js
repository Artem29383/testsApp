import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

const userReducer = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    msgError: '',
    isAdmin: false,
    name: '',
    isInit: false,
  },
  reducers: {
    logoutUser(state) {
      state.isAuth = false;
      state.name = '';
      state.isAdmin = false;
      state.msgError = '';
    },
    loginUserFailure(state, { payload }) {
      state.msgError = payload;
    },
    loginUserSuccess(state, { payload }) {
      Object.assign(state, payload);
    },
    setInit(state, { payload }) {
      state.isInit = payload;
    },
  },
});

export default userReducer.reducer;
export const {
  logoutUser,
  loginUserFailure,
  loginUserSuccess,
  setInit,
} = userReducer.actions;
