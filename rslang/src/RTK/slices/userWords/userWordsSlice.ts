import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IError } from '../../../components/types';
import { RootState } from '../../store';

interface IUserWord {
  id: string;
  difficulty: string;
  wordId: string;
}

const initialState: { words: IUserWord[] } = {
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
  if (userId) {
    try {
      const { data } = await axios.get(`/users/${userId}/words`);
      return data;
    } catch (error) {
      const result = error as IError;
      if (result.response.status === 417) {
        console.error('Word already exists');
      }
      return { message: getErrorMessage(error) };
    }
  } else {
    return initialState;
  }
});

const updateUserWordTrunk = createAsyncThunk(
  'userWords/updateUserWordsThunk',
  async (dto: { id: string; difficulty: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const userId = state.auth.userId;
    const jwt = state.auth.token;
    token.set(jwt!);
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
      .addCase(postUserWordsThunk.fulfilled, (state, action) => {
        state.words.push(action.payload);
      })
      .addCase(updateUserWordTrunk.fulfilled, (state, action) => {
        state.words = state.words.map(word => {
          if (word.wordId === action.payload.wordId) {
            return action.payload;
          } else {
            return word;
          }
        });
      });
  },
});

export {
  postUserWordsThunk,
  getUserWordsThunk,
  deleteUserWordThunk,
  updateUserWordTrunk,
  userWordsSlice,
  type IUserWord,
};
