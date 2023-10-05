import Container from '../Container/Container';
import LogoutButton from '../LogoutButton/LogoutButton';
import Search from '../Search/Search';

import styles from './Header.module.scss';

interface IProperties {}

const Header: React.FC<IProperties> = () => {
  return (
    <header className={styles.Header}>
      <Container className={styles.inner}>
        <Search />
        <LogoutButton />
      </Container>
    </header>
  );
};

export default Header;
