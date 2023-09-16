import Container from '../Container/Container';

import styles from './PageBannerWrapper.module.scss';

interface IProperties {
  children: React.ReactNode;
}

const PageBannerWrapper: React.FC<IProperties> = ({ children }) => {
  return (
    <div className={styles.PageBannerWrapper}>
      <Container>{children}</Container>
    </div>
  );
};

export default PageBannerWrapper;
