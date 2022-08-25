import { NavLink } from 'react-router-dom';

import styles from './AuthNav.module.scss';

const AuthNav = (): JSX.Element => (
  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
    <NavLink end to="/signin" className={styles.link}>
      Sign in
    </NavLink>
    <NavLink end to="/singup" className={styles.link}>
      Sign up
    </NavLink>
  </div>
);

export default AuthNav;
