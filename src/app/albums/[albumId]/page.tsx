import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import List from '@/components/List/List';
import Section from '@/components/Section/Section';
import { getAlbumTracks } from '@/lib/Spotify/album';
import { TrackInterface } from '@/types';

interface PageInterface {
  params: { albumId: string };
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const { albumId } = params || {};
  const page = Number(searchParams?.page || 1);
  const albumTracks: { items: TrackInterface[]; total: number; limit: number } =
    await getAlbumTracks(albumId, page, 10);
  const { items, total, limit } = albumTracks || {};

  return (
    <Container>
      {items?.length > 0 && (
        <Section title={'Album Tracks'}>
          <List>{items?.map((track) => <TrackRow key={track.id} track={track} />)}</List>
        </Section>
      )}
      <Pagination currentPage={page} totalPages={Math.floor(total / limit)} navigate />
    </Container>
  );
};

export default Page;
