import { redirectToSpotifyLogin } from '@/lib/Spotify/auth';

import LoginButton from '../LoginButton/LoginButton';

import styles from './LoginScreen.module.scss';

const LoginScreen: React.FC = () => (
  <div className={styles.screen}>
    <h1>Spotify Profile</h1>
    <LoginButton onClick={redirectToSpotifyLogin} />
  </div>
);

export default LoginScreen;
