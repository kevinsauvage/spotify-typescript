import ProfilBanner from '@/components/ProfilBanner/ProfilBanner';
import ProfilTops from '@/components/ProfilTops/ProfilTops';
import {
  getEndpointMe,
  getEndpointTopArtists,
  getEndpointTopTracks,
  getStats,
} from '@/lib/Spotify';

import styles from './page.module.scss';

const getUserData = async () =>
  Promise.all([getEndpointMe(), getEndpointTopArtists(), getEndpointTopTracks(), getStats()]);

const Home = async () => {
  const [userData, userTopArtists, userTopTracks, stats] = await getUserData();

  return (
    <main className={styles.main}>
      <ProfilBanner userData={userData} stats={stats} />
      <ProfilTops userTopArtists={userTopArtists} userTopTracks={userTopTracks} />
    </main>
  );
};

export default Home;
