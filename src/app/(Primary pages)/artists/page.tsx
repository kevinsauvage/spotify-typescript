import SavedArtists from '@/components/_sections/SavedArtists/SavedArtists';
import TopArtists from '@/components/_sections/TopArtists/TopArtists';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointFollowedArtists, getEndpointTopArtists } from '@/lib/Spotify/user';
import { FollowedArtistsInterface, UserTopArtistInterface } from '@/types';

interface PageInterface {}

const Page: React.FC<PageInterface> = async () => {
  const [userTopArtists, followedArtists]: [UserTopArtistInterface, FollowedArtistsInterface] =
    await Promise.all([
      getEndpointTopArtists(undefined, 'short_term', 12),
      getEndpointFollowedArtists(12),
    ]);

  return (
    <Container>
      <PageBannerWrapper>
        <Title>Artists</Title>
      </PageBannerWrapper>
      <TopArtists userTopArtists={userTopArtists} />
      <SavedArtists followedArtists={followedArtists} />
    </Container>
  );
};

export default Page;
