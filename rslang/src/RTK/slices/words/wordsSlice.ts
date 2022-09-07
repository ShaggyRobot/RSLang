import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getWords, IWord } from '../../../API/words';

interface IWordsState {
  words: Array<IWord>;
  status: null | string;
}

const getWordsThunk = createAsyncThunk(
  'words/getWordsThunk',
  async function (arg: { group: number; page: number }): Promise<IWord[]> {
    const { group, page } = arg;
    const words = await getWords(group, page);
    return words;
  },
);

const initialState: IWordsState = {
  words: [],
  status: null,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    clearStateAction: (_state: typeof initialState, _action: PayloadAction) => initialState,
  },
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
export const { clearStateAction } = wordsSlice.actions;
