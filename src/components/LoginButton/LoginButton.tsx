'use client';

import { redirectToSpotifyLogin } from '@/serverActions/url';

import styles from './LoginButton.module.scss';

const LoginButton: React.FC = () => (
  <button type="button" className={styles.link} onClick={() => redirectToSpotifyLogin()}>
    Login to Spotify
  </button>
);

export default LoginButton;
