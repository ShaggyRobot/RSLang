import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = true;

export const authorizedSlice = createSlice({
  name: 'authorized',
  initialState,
  reducers: {
    setAuthorizedAction: (state: boolean, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});
