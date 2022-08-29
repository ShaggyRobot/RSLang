import Modal from '../Modal';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';

import styles from './AuthNav.module.scss';

const AuthNav = (): JSX.Element => (
  <div className={styles.authNav}>
    <Modal nameOption={'Sign in'}>
      <SignIn />
    </Modal>
    <Modal nameOption={'Sign Up'}>
      <SignUp />
    </Modal>
  </div>
);

export default AuthNav;
