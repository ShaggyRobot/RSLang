import { createSlice } from '@reduxjs/toolkit';

import { DataOptions } from '../../../components/types';

import getStatisticsThunk from './statistics-operations';

const initialState: DataOptions = {
  learnedWords: 0,
  optional: {},
  status: null,
};

// {
//   "learnedWords": 0,
//   "optional": {}
// }

const authSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStatisticsThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.learnedWords = action.payload.learnedWords;
        state.optional = action.payload.optional;
      })
      .addCase(getStatisticsThunk.pending, state => {
        state.status = 'loading';
      });
  },
});

export default authSlice.reducer;
