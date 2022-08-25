import { createSlice } from '@reduxjs/toolkit';

import authOperations from './auth-operations';

const initialState = {
  token: null,
  message: null,
  userId: null,
  name: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.userId = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.refreshToken = action.payload.refreshToken;
    },
    [authOperations.logOut.fulfilled](state) {
      // сброс в начальное состояние
      state.token = null;
      state.refreshToken = null;
      state.message = null;
      state.userId = null;
      state.name = null;
    },
  },
});

export default authSlice.reducer;
