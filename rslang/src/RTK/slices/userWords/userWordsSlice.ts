import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getWordsWithoutPage } from '../../../API/words';
import { IError } from '../../../components/types';
import { RootState } from '../../store';

interface userWord {
  id: string;
  difficulty: string;
  wordId: string;
}

const initialState: { words: userWord[] } = {
  words: [],
};

function getErrorMessage(error: unknown): string {
  throw new Error('Function not implemented.');
}

const token = {
  set(token: string): void {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(): void {
    axios.defaults.headers.common.Authorization = '';
  },
};

const postUserWordsThunk = createAsyncThunk(
  'userWords/postUserWordsThunk',
  async (dto: { id: string; difficulty: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const userId = state.auth.userId;
    const jwt = state.auth.token;
    token.set(jwt!);
    try {
      const { data } = await axios.post(`/users/${userId}/words/${dto.id}`, {
        difficulty: dto.difficulty,
        optional: {},
      });
      return data;
    } catch (error) {
      const result = error as IError;
      if (result.response.status === 417) {
        console.error('Word already exists');
      }
      return { message: getErrorMessage(error) };
    }
  },
);

const getUserWordsThunk = createAsyncThunk('userWords/getUserWordsThunk', async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const userId = state.auth.userId;
  const jwt = state.auth.token;
  token.set(jwt!);
  // console.log('getUserWords');
  try {
    const { data } = await axios.get(`/users/${userId}/words`);
    // console.log(data);
    return data;
  } catch (error) {
    const result = error as IError;
    if (result.response.status === 417) {
      console.error('Word already exists');
    }
    return { message: getErrorMessage(error) };
  }
});

const updateUserWordTrunk = createAsyncThunk(
  'userWords/updateUserWordsThunk',
  async (dto: { id: string; difficulty: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const userId = state.auth.userId;
    const jwt = state.auth.token;
    token.set(jwt!);
    console.log('updateUserWords');
    try {
      const { data } = await axios.put(`/users/${userId}/words/${dto.id}`, {
        difficulty: dto.difficulty,
        optional: {},
      });
      return data;
    } catch (error) {
      const result = error as IError;
      if (result.response.status === 417) {
        console.error('Word already exists');
      }
      return { message: getErrorMessage(error) };
    }
  },
);

const deleteUserWordThunk = createAsyncThunk(
  'statistics/deleteWordThunk',
  async (dto: { id: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const userId = state.auth.userId;
    const jwt = state.auth.token;
    token.set(jwt!);

    try {
      axios.delete(`/users/${userId}/words/${dto.id}`);
      return dto.id;
    } catch (error) {
      const result = error as IError;
      if (result.response.status === 417) {
        console.error('Word already exists');
      }
      return { message: getErrorMessage(error) };
    }
  },
);

const userWordsSlice = createSlice({
  name: 'userWords',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserWordsThunk.fulfilled, (state, action) => {
        state.words = action.payload;
      })
      .addCase(deleteUserWordThunk.fulfilled, (state, action) => {
        state.words = state.words.filter(word => word.wordId !== action.payload);
      })
      .addCase(postUserWordsThunk.fulfilled, (state, action) => {});
  },
});

export {
  postUserWordsThunk,
  getUserWordsThunk,
  deleteUserWordThunk,
  updateUserWordTrunk,
  userWordsSlice,
};
