import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  SignUpCredentials,
  SignInCredentials,
  StateOptions,
  IError,
} from '../../../components/types';

const options = {
  autoClose: 3000,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
  closeOnClick: true,
};

axios.defaults.baseURL = 'https://backend-rslang.herokuapp.com';

const token = {
  set(token: string): void {
    axios.defaults.headers.common.Authorized = `Bearer ${token}`;
  },
  unset(): void {
    axios.defaults.headers.common.Authorized = '';
  },
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

const logUp = createAsyncThunk<SignUpCredentials, SignUpCredentials, { rejectValue: string }>(
  'stati/logUp',
  async (credentials: SignUpCredentials) => {
    try {
      const { data } = await axios.post('/users', credentials);
      token.set(data.token);
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

const logIn = createAsyncThunk<StateOptions, SignInCredentials>('auth/logIn', async credentials => {
  try {
    const { data } = await axios.post('/signin', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    const result = error as IError;

    if (result.response.status === 404) {
      toast.error('Incorrect e-mail or password', options);
    } else if (result.response.status === 403) {
      toast.error('Incorrect e-mail or password', options);
    } else if (result.response.status === 500) {
      toast.error('Server error, please try later', options);
    } else {
      toast.error(`${result.message}`, options);
    }
    return { message: getErrorMessage(error) };
  }
});

const logOut = createAsyncThunk('auth/logOut', async () => {
  try {
    token.unset();
  } catch (error) {
    return { message: getErrorMessage(error) };
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { logUp, logIn, logOut };
