import Person from '@/assets/icons/person';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';

import LogoutButton from '../../../LogoutButton/LogoutButton';
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
  <PageBannerWrapper>
    <div className={styles.banner}>
      <Person />
      <h1>{userData?.display_name}</h1>
      <ProfilStats stats={stats} />
      <LogoutButton />
    </div>
  </PageBannerWrapper>
);

export default ProfilBanner;
