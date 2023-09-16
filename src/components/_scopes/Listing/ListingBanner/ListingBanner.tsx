import { ReactNode } from 'react';

import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';

import styles from './ListingBanner.module.scss';

interface ListingBannerInterface {
  title: string | ReactNode;
}

const ListingBanner: React.FC<ListingBannerInterface> = ({ title }) => (
  <PageBannerWrapper>
    <div className={styles.banner}>
      <h1>{title}</h1>
    </div>
  </PageBannerWrapper>
);

export default ListingBanner;
