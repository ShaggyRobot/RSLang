import React from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';

import { authSelectors, authOperations } from '../../RTK/slices/auth';
import { useAppDispatch } from '../Hooks/hook';

import styles from './UserMenu.module.scss';

function UserMenu(): JSX.Element {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const logOutHandler = () => dispatch(authOperations.logOut());
  const name = useSelector(authSelectors.getUsername);

  return (
    <div className={styles.logoutContainer}>
      <span className={styles.logoutName}>{name}</span>
      <Button type='button' onClick={logOutHandler} color='inherit' variant='outlined' size='small'>
        Log out
      </Button>
    </div>
  );
}

export default UserMenu;
