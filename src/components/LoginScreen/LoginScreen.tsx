import LoginButton from '../LoginButton/LoginButton';

import styles from './LoginScreen.module.scss';

const LoginScreen: React.FC = () => (
  <div className={styles.screen}>
    <h1>Spotify Profile</h1>
    <LoginButton />
  </div>
);

export default LoginScreen;
