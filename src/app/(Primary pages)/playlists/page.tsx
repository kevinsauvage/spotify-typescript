import FeaturedPlaylists from '@/components/_sections/FeaturedPlaylists/FeaturedPlaylists';
import UserPlaylists from '@/components/_sections/SavedPlaylists/SavedPlaylists';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getFeaturedPlaylists } from '@/lib/Spotify/playlist';
import { getEndpointMePlaylists } from '@/lib/Spotify/user';
import { FeaturedPlaylistInterface, UserPlaylistInterface } from '@/types';

interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async () => {
  const [followedPlaylists, featuredPlaylists]: [UserPlaylistInterface, FeaturedPlaylistInterface] =
    await Promise.all([getEndpointMePlaylists(1, 10), getFeaturedPlaylists('US', 1, 10)]);

  return (
    <Container>
      <PageBannerWrapper>
        <Title>Playlists</Title>
      </PageBannerWrapper>
      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />
      <UserPlaylists followedPlaylists={followedPlaylists} />
    </Container>
  );
};

export default Page;
