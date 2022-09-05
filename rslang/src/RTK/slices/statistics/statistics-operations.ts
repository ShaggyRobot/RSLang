import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { IError, State } from '../../../components/types';
import { IGameStats } from '../../../pages/audioCallPage/AudioCallGame';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { authSelectors } from '../auth';
import { Dot } from 'recharts';
import { config } from 'process';

const options = {
  autoClose: 3000,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
  closeOnClick: true,
};

const token = {
  set(token: string): void {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(): void {
    axios.defaults.headers.common.Authorization = '';
  },
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

const getStatisticsThunk = createAsyncThunk(
  'statistics/getStatisticsThunk',
  async (id: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const jwt = state.auth.token;
    token.set(jwt!);
    try {
      const { data } = await axios.get(`/users/${id}/statistics`);
      console.log('GET:', data);
      return data;
    } catch (error) {
      const result = error as IError;

      if (result.response.status === 417) {
        toast.error('User already exists', options);
      }
      return { message: getErrorMessage(error) };
    }
  },
);

const putStatisticsThunk = createAsyncThunk(
  'statistics/putStatisticsThunk',
  async (dto: { id: string; optional: IGameStats }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const jwt = state.auth.token;
    token.set(jwt!);
    thunkApi.dispatch(getStatisticsThunk(dto.id));

    const a = state.statsSlice;
    console.log(a);

    try {
      const { data } = await axios.put(`/users/${dto.id}/statistics`, {
        learnedWords: 0,
        optional: {statistics: []},
      });
      return data;
    } catch (error) {
      const result = error as IError;

      if (result.response.status === 417) {
        toast.error('User already exists', options);
      }
      return { message: getErrorMessage(error) };
    }
  },
);

export { getStatisticsThunk, putStatisticsThunk };
