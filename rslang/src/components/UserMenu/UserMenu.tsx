import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../Hooks/hook';
import { authSelectors, authOperations } from '../../RTK/slices/auth';

import styles from './UserMenu.module.scss';

function UserMenu(): JSX.Element {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const increaseCounter = () => dispatch(authOperations.logOut());
  const name = useSelector(authSelectors.getUsername);

  return (
    <div className={styles.logoutContainer}>
      <span className={styles.logoutName}>{name}</span>
      <button type='button' onClick={increaseCounter}>
        Log out
      </button>
    </div>
  );
}

export default UserMenu;
