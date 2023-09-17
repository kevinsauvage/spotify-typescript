import ProfilBanner from '@/components/_scopes/Profil/ProfilBanner/ProfilBanner';
import ProfilTops from '@/components/_scopes/Profil/ProfilTops/ProfilTops';
import Container from '@/components/Container/Container';
import {
  getEndpointMe,
  getEndpointRecentTracks,
  getEndpointTopArtists,
  getEndpointTopTracks,
  getStats,
} from '@/lib/Spotify/user';

const page: React.FC = async () => {
  const [userData, userTopArtists, userTopTracks, stats, recentlyPlayedTracks] = await Promise.all([
    getEndpointMe(),
    getEndpointTopArtists(undefined, undefined, 5),
    getEndpointTopTracks(undefined, undefined, 5),
    getStats(),
    getEndpointRecentTracks(5),
  ]);

  return (
    <div>
      <ProfilBanner userData={userData} stats={stats} />
      <Container>
        <ProfilTops
          userTopArtists={userTopArtists}
          userTopTracks={userTopTracks}
          recentlyPlayedTracks={recentlyPlayedTracks}
        />
      </Container>
    </div>
  );
};

export default page;
