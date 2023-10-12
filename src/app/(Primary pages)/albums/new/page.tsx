import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getNewRelease } from '@/lib/Spotify/album';
import { NewReleasesAlbums } from '@/types';

interface PageInterface {
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const page = Number(searchParams.page || 1);

  const newReleased: NewReleasesAlbums = await getNewRelease('US', page, 20);

  const albums = newReleased?.albums;

  return (
    <Container>
      <Breadcrumbs />
      <PageBannerWrapper>
        <Title>New Released Albums</Title>
      </PageBannerWrapper>
      <Grid>{albums?.items.map((album) => <AlbumCard key={album.id} album={album} />)}</Grid>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(albums?.total / albums?.limit)}
        navigate
      />
    </Container>
  );
};

export default Page;
