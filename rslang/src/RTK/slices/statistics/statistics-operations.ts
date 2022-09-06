import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { IError } from '../../../components/types';
import { RootState } from '../../store';
import { IGameStatsDTO } from '../../../pages/audioCallPage/sendStats';

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
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const userId = state.auth.userId;
    const jwt = state.auth.token;
    token.set(jwt!);
    try {
      const { data } = await axios.get(`/users/${userId}/statistics`);
      // console.log('getStatistics', data);
      return data;
    } catch (error) {
      const result = error as IError;

      if (result.response.status === 401) {
        toast.error('Access token is missing or invalid', options);
      }
      if (result.response.status === 404) {
        toast.error('Statistics not found', options);
      }
      return { message: getErrorMessage(error) };
    }
  },
);

interface putOptionsThunk {
  [key: string]: IGameStatsDTO;
}

const putStatisticsThunk = createAsyncThunk(
  'statistics/putStatisticsThunk',
  async (dto: { optional: putOptionsThunk }, thunkApi) => {
    const { optional } = dto;

    const state = thunkApi.getState() as RootState;
    const userId = state.auth.userId;
    const jwt = state.auth.token;
    token.set(jwt!);
    try {
      const { data } = await axios.put(`/users/${userId}/statistics`, { optional });
      return data;
    } catch (error) {
      const result = error as IError;

      if (result.response.status === 400) {
        toast.error('Bad request', options);
      }
      if (result.response.status === 401) {
        toast.error('Access token is missing or invalid', options);
      }
      return { message: getErrorMessage(error) };
    }
  },
);

export { getStatisticsThunk, putStatisticsThunk };
