import BannerArtist from '@/components/_banners/BannerArtist/BannerArtist';
import AlbumRow from '@/components/_rows/AlbumRow/AlbumRow';
import AlbumTable from '@/components/_scopes/Listing/AlbumTable/AlbumTable';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import { getArtist, getArtistAlbums } from '@/lib/Spotify/artist';
import { ArtistAlbumsInterface, ArtistInterface } from '@/types';

interface PageInterface {
  params: { artistId: string };
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const { artistId } = params || {};
  const page = Number(searchParams.page || 1);

  const [albums, artist]: [ArtistAlbumsInterface, ArtistInterface] = await Promise.all([
    getArtistAlbums(artistId, page, 20),
    getArtist(artistId),
  ]);

  return (
    <Container>
      <Breadcrumbs config={{ 1: { href: `/artists/${artistId}`, name: artist.name } }} />
      <BannerArtist artist={artist} />
      {albums?.items?.length > 0 && (
        <Section title="Albums">
          <AlbumTable showPopularity={false}>
            {albums.items.map((album) => (
              <AlbumRow key={album.id} album={album} />
            ))}
          </AlbumTable>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(albums?.total / albums?.limit)}
            navigate
          />
        </Section>
      )}
    </Container>
  );
};

export default Page;
