import { ReactNode } from 'react';

import styles from './ListingBanner.module.scss';

interface ListingBannerInterface {
  title: string | ReactNode;
}

const ListingBanner: React.FC<ListingBannerInterface> = ({ title }) => (
  <div className={styles.banner}>
    <h1>{title}</h1>
  </div>
);

export default ListingBanner;
