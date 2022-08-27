import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';

// import storage from 'redux-persist/lib/storage';

import { authReducer } from './slices';

// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['name', 'userId', 'token'],
// };

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // auth: persistReducer(authPersistConfig, authReducer),
  },

  devTools: process.env.NODE_ENV === 'development',
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
