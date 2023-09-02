import Navigation from '../Navigation/Navigation';

import styles from './SideBar.module.scss';

const SideBar = () => (
  <div className={styles.sidebar}>
    <Navigation />
  </div>
);

export default SideBar;
