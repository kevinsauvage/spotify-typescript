import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';

import styles from './BannerSearch.module.scss';

const BannerSearch: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Container>
      <PageBannerWrapper>
        <div className={styles.banner}>
          <h1>{title}</h1>
        </div>
      </PageBannerWrapper>
    </Container>
  );
};

export default BannerSearch;
