import Link from 'next/link';

import styles from './LoginScreen.module.scss';

const LoginScreen: React.FC = () => (
  <div className={styles.screen}>
    <h1>Spotify Profile</h1>
    <Link className={styles.link} href="/login/spotify">
      Login to Spotify
    </Link>
  </div>
);

export default LoginScreen;
