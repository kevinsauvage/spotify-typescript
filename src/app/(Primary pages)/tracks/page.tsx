import RecentlyPlayedTracks from '@/components/_sections/RecentlyPlayedTracks/RecentlyPlayedTracks';
import RecommendedTracks from '@/components/_sections/RecommendedTracks/RecommendedTracks';
import SavedTracks from '@/components/_sections/SavedTracks/SavedTracks';
import UserTopTrack from '@/components/_sections/TopTracks/TopTracks';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import Wrapper from '@/components/Wrapper/Wrapper';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import {
  getEndpointRecentTracks,
  getEndpointSavedTracks,
  getEndpointTopTracks,
} from '@/lib/Spotify/user';
import {
  RecentlyPlayedInterface,
  TrackInterface,
  UserSavedTracksInterface,
  UserTopTrackInterface,
} from '@/types';

interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async () => {
  const [userTopTracks, recentlyPlayedTracks, savedTracks]: [
    UserTopTrackInterface,
    RecentlyPlayedInterface,
    UserSavedTracksInterface,
  ] = await Promise.all([
    getEndpointTopTracks(undefined, 'short_term', 6),
    getEndpointRecentTracks(6),
    getEndpointSavedTracks(1, 10),
  ]);

  const recommendations: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 10,
    seedTracks:
      userTopTracks?.items
        ?.slice(0, 5)
        .map((track) => track.id)
        .join(',') || undefined,
  });

  return (
    <Container>
      <PageBannerWrapper>
        <Title>Tracks</Title>
      </PageBannerWrapper>
      <RecommendedTracks recommendations={recommendations} title="Tracks You May Like" />
      <Wrapper>
        <UserTopTrack tracks={userTopTracks.items} />
        <RecentlyPlayedTracks recentlyPlayedTracks={recentlyPlayedTracks} />
      </Wrapper>
      <SavedTracks savedTracks={savedTracks} />
    </Container>
  );
};

export default Page;
