import FiltersPeriod from '@/components/FiltersPeriod/FiltersPeriod';

import styles from './ListingBanner.module.scss';

interface ListingBannerInterface {
  path: string;
  title: string;
  period?: string;
}

const ListingBanner: React.FC<ListingBannerInterface> = ({ path, title, period }) => (
  <div className={styles.banner}>
    <h1>{title}</h1>
    <FiltersPeriod path={path} period={period} />
  </div>
);

export default ListingBanner;
