// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import {
  // persistStore,
  persistReducer,
  // FLUSH,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
  // REHYDRATE,
} from 'redux-persist';
// import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './slices';

// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
//   logger,
// ];

// if (process.env.NODE_ENV === 'development') {
//   middleware.push(logger);
// }

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['name', 'userId', 'token'],
};

export const store = configureStore({
  reducer: {
    // auth: authReducer,

    auth: persistReducer(authPersistConfig, authReducer),
  },
  // middleware,
  // devTools: process.env.NODE_ENV === 'development',
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
