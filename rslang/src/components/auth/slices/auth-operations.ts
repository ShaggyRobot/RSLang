import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// import { SignUpCredentials, SignInCredentials, State } from '../../types';

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

const logUp = createAsyncThunk('auth/singup', async credentials => {
  try {
    const { data } = await axios.post('/users', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    return { message: getErrorMessage(error) };
  }
});

const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/signin', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    return { message: getErrorMessage(error) };
  }
});

const logOut = createAsyncThunk('auth/logout', () => {
  try {
    token.unset();
  } catch (error) {
    return { message: getErrorMessage(error) };
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { logUp, logIn, logOut };
