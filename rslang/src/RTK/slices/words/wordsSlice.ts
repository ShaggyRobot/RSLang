import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getWords, IWord } from '../../../API/words';

const getWordsThunk = createAsyncThunk(
  'words/getWordsThunk',
  async function (arg: { group: number; page: number }): Promise<IWord[]> {
    const words = await getWords(arg.group, arg.page);
    return words;
  },
);

const initialState: { words: IWord[]; status: null | string } = {
  words: [],
  status: null,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWordsThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.words = action.payload;
      })
      .addCase(getWordsThunk.pending, state => {
        state.status = 'loading';
      });
  },
});

export { getWordsThunk, wordsSlice };
