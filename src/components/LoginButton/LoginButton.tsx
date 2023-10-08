'use client';

import styles from './LoginButton.module.scss';

interface IProperties {
  onClick: () => void;
}

const LoginButton: React.FC<IProperties> = ({ onClick }) => (
  <button type="button" className={styles.link} onClick={() => onClick()}>
    Login to Spotify
  </button>
);

export default LoginButton;
