import Person from '@/assets/icons/person';

import LinkButton from '../LinkButton/LinkButton';
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
    <Person />
    <h1>{userData?.display_name}</h1>
    <ProfilStats stats={stats} />
    <LinkButton href="logout">Logout</LinkButton>
  </div>
);

export default ProfilBanner;
