import { useDispatch, useSelector } from 'react-redux';

import { authSelectors, authOperations } from '../auth/slices';
import styles from './UserMenu.module.scss';

function UserMenu(): JSX.Element {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);

  return (
    <div className={styles.logoutContainer}>
      <span className={styles.logoutName}>{name}</span>
      <button type="button" onClick={() => dispatch(authOperations.logOut())}>
        Log out
      </button>
    </div>
  );
}

export default UserMenu;
