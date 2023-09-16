import ProfilBanner from '@/components/_scopes/Profil/ProfilBanner/ProfilBanner';
import ProfilTops from '@/components/_scopes/Profil/ProfilTops/ProfilTops';
import Container from '@/components/Container/Container';
import {
  getEndpointMe,
  getEndpointTopArtists,
  getEndpointTopTracks,
  getStats,
} from '@/lib/Spotify/user';

const page: React.FC = async () => {
  const [userData, userTopArtists, userTopTracks, stats] = await Promise.all([
    getEndpointMe(),
    getEndpointTopArtists(),
    getEndpointTopTracks(),
    getStats(),
  ]);

  return (
    <div>
      <ProfilBanner userData={userData} stats={stats} />
      <Container>
        <ProfilTops userTopArtists={userTopArtists} userTopTracks={userTopTracks} />
      </Container>
    </div>
  );
};

export default page;
