import ProfilBanner from '@/components/ProfilBanner/ProfilBanner';
import ProfilTops from '@/components/ProfilTops/ProfilTops';
import {
  getEndpointMe,
  getEndpointTopArtists,
  getEndpointTopTracks,
  getStats,
} from '@/lib/Spotify';

const page: React.FC = async () => {
  const [userData, userTopArtists, userTopTracks, stats] = await Promise.all([
    getEndpointMe(),
    getEndpointTopArtists(),
    getEndpointTopTracks(),
    getStats(),
  ]);

  return (
    <>
      <ProfilBanner userData={userData} stats={stats} />
      <ProfilTops userTopArtists={userTopArtists} userTopTracks={userTopTracks} />
    </>
  );
};

export default page;
