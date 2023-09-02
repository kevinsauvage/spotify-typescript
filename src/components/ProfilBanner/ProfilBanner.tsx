import { LiaUserCircleSolid } from 'react-icons/lia';

import ProfilStats, { StatInterface } from '../ProfilStats/ProfilStats';

import styles from './ProfilBanner.module.scss';

interface ProfilBannerProperties {
  userData: {
    display_name: string;
    followers: {
      total: number;
    };
  };
  stats: StatInterface[];
}

const ProfilBanner = ({ userData, stats }: ProfilBannerProperties) => (
  <div className={styles.banner}>
    <LiaUserCircleSolid size={200} />
    <h1>{userData?.display_name}</h1>
    <ProfilStats stats={stats} />
  </div>
);

export default ProfilBanner;
