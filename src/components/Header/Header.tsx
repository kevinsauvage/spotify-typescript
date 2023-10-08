import { logoutServerAction } from '@/lib/Spotify/auth';

import Container from '../Container/Container';
import LogoutButton from '../LogoutButton/LogoutButton';
import Search from '../Search/Search';

import styles from './Header.module.scss';

interface IProperties {}

const Header: React.FC<IProperties> = () => {
  return (
    <header className={styles.Header}>
      <Container>
        <div className={styles.inner}>
          <Search />
          <LogoutButton onClick={logoutServerAction} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
