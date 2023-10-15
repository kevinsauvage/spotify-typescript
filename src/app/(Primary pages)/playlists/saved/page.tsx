import Playlist from '@/components/_cards/PlaylistCard/PlaylistCard';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointMePlaylists } from '@/lib/Spotify/user';
import { UserPlaylistInterface } from '@/types';

interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const page = Number(searchParams.page || 1);

  const followedPlaylists: UserPlaylistInterface = await getEndpointMePlaylists(page, 20);

  return (
    <Container>
      <Breadcrumbs />
      <PageBannerWrapper>
        <Title>Playlists</Title>
      </PageBannerWrapper>
      <Grid>
        {Array.isArray(followedPlaylists?.items) &&
          followedPlaylists?.items?.map((playlist) => (
            <Playlist key={playlist.id} playlist={playlist} />
          ))}
      </Grid>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(followedPlaylists?.total / followedPlaylists?.limit)}
        navigate
      />
    </Container>
  );
};

export default Page;
