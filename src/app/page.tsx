import ProfilBanner from '@/components/ProfilBanner/ProfilBanner';
import ProfilTops from '@/components/ProfilTops/ProfilTops';
import {
  getEndpointMe,
  getEndpointTopArtists,
  getEndpointTopTracks,
  getStats,
} from '@/lib/Spotify';

import styles from './page.module.scss';

const page: React.FC = async () => {
  const [userData, userTopArtists, userTopTracks, stats] = await Promise.all([
    getEndpointMe(),
    getEndpointTopArtists(),
    getEndpointTopTracks(),
    getStats(),
  ]);

  return (
    <main className={styles.main}>
      <ProfilBanner userData={userData} stats={stats} />
      <ProfilTops userTopArtists={userTopArtists} userTopTracks={userTopTracks} />
    </main>
  );
};

export default page;
