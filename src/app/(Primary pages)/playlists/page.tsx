import BrowzeCategories from '@/components/_sections/BrowzeCategories/BrowzeCategories';
import FeaturedPlaylists from '@/components/_sections/FeaturedPlaylists/FeaturedPlaylists';
import UserPlaylists from '@/components/_sections/SavedPlaylists/SavedPlaylists';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getBrowseCategories, getFeaturedPlaylists } from '@/lib/Spotify/playlist';
import { getEndpointMePlaylists } from '@/lib/Spotify/user';
import {
  BrowzeCategoriesResponse,
  FeaturedPlaylistInterface,
  UserPlaylistInterface,
} from '@/types';

interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async () => {
  const [followedPlaylists, featuredPlaylists, browseCategories]: [
    UserPlaylistInterface,
    FeaturedPlaylistInterface,
    BrowzeCategoriesResponse,
  ] = await Promise.all([
    getEndpointMePlaylists(1, 12),
    getFeaturedPlaylists('US', 1, 12),
    getBrowseCategories('US', 1, 24),
  ]);

  return (
    <Container>
      <PageBannerWrapper>
        <Title>Playlists</Title>
      </PageBannerWrapper>
      <BrowzeCategories
        browseCategories={browseCategories?.categories?.items}
        href="/playlists/categories"
        title="Categories"
      />
      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />

      <UserPlaylists followedPlaylists={followedPlaylists} />
    </Container>
  );
};

export default Page;
