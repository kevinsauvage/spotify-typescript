import AlbumRow from '@/components/_rows/AlbumRow/AlbumRow';
import AlbumTable from '@/components/_scopes/Listing/AlbumTable/AlbumTable';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import { getArtistAlbums } from '@/lib/Spotify/artist';
import { ArtistAlbumsInterface } from '@/types';

interface PageInterface {
  params: { artistId: string };
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const { artistId } = params || {};
  const page = Number(searchParams.page || 1);

  const albums: ArtistAlbumsInterface = await getArtistAlbums(artistId, page, 20);

  return (
    <Container>
      {albums?.items?.length > 0 && (
        <Section title="Albums">
          <AlbumTable showPopularity={false}>
            {albums.items.map((album) => (
              <AlbumRow key={album.id} album={album} />
            ))}
          </AlbumTable>
          <Pagination
            currentPage={page}
            totalPages={Math.floor(albums?.total / albums?.limit)}
            navigate
          />
        </Section>
      )}
    </Container>
  );
};

export default Page;