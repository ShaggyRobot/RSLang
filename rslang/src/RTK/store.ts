import { configureStore } from '@reduxjs/toolkit';

import { authorizedSlice } from './slices/authorizedSlice';

const store = configureStore({
  reducer: {
    authorized: authorizedSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
