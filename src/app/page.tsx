import ProfilBanner from '@/components/ProfilBanner/ProfilBanner';
import {
  getEndpointMe,
  getEndpointTopArtists,
  getEndpointTopTracks,
  getStats,
} from '@/lib/Spotify';

import styles from './page.module.scss';

const page: React.FC = async () => {
  const [userData, stats] = await Promise.all([
    getEndpointMe(),
    getEndpointTopArtists(),
    getEndpointTopTracks(),
    getStats(),
  ]);

  return (
    <main className={styles.main}>
      <ProfilBanner userData={userData} stats={stats} />
    </main>
  );
};

export default page;
