import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointSavedAlbums } from '@/lib/Spotify/user';
import { SavedAlbumResponseInterface } from '@/types';

interface PageInterface {
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const page = Number(searchParams.page || 1);

  const savedAlbumns: SavedAlbumResponseInterface = await getEndpointSavedAlbums(page, 20);

  return (
    <Container>
      <Breadcrumbs />
      <PageBannerWrapper>
        <Title>Albums</Title>
      </PageBannerWrapper>
      <Grid>
        {savedAlbumns?.items?.map((album) => (
          <AlbumCard key={album.album.id} album={album.album} />
        ))}
      </Grid>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(savedAlbumns?.total / savedAlbumns?.limit)}
        navigate
      />
    </Container>
  );
};

export default Page;
