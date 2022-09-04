import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { IError } from '../../../components/types';

const options = {
  autoClose: 3000,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
  closeOnClick: true,
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

const getStatisticsThunk = createAsyncThunk('statistics/getStatisticsThunk', async (id: string) => {
  try {
    const { data } = await axios.post(`/users/${id}/statistics`);
    return data;
  } catch (error) {
    const result = error as IError;

    if (result.response.status === 417) {
      toast.error('User already exists', options);
    }
    return { message: getErrorMessage(error) };
  }
});

export default getStatisticsThunk;
