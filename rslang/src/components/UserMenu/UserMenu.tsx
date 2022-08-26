import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { Dispatch } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authSelectors, authOperations } from '../auth/slices';
import { store } from '../auth/store';
import styles from './UserMenu.module.scss';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { StateOptions, ActionOptions } from '../types';
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import type {RootState, AppDispatch} from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


function UserMenu(): JSX.Element {
  // const dispatch = useDispatch();
  // const dispatch = useAppDispatch();
  const dispatch: Dispatch<AnyAction>(action: AnyAction) => AnyAction
  
  const increaseCounter = (): void => dispatch(authOperations.logOut());
  const name = useSelector(authSelectors.getUsername);

  return (
    <div className={styles.logoutContainer}>
      <span className={styles.logoutName}>{name}</span>
      {/* <button type="button" onClick={() => dispatch(authOperations.logOut())}> */}
      <button type="button" onClick={increaseCounter}>
        {/* <button type="button" onClick={() => dispatch(dispatchLogOut())}> */}
        Log out
      </button>
    </div>
  );
}

export default UserMenu;
