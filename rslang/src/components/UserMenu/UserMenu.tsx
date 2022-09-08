import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';

import { authSelectors, authOperations } from '../../RTK/slices/auth';
import { useAppDispatch } from '../Hooks/hook';

import styles from './UserMenu.module.scss';

function UserMenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = useSelector(authSelectors.getUsername);

  const logOutHandler = (): void => {
    dispatch(authOperations.logOut());
    navigate('/');
  };

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
