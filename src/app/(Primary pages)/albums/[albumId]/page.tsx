import BannerAlbum from '@/components/_banners/BannerAlbum/BannerAlbum';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Wrapper from '@/components/Wrapper/Wrapper';
import { getAlbumById, getAlbumTracks } from '@/lib/Spotify/album';
import { AlbumInterface, AlbumTracksInterface } from '@/types';

interface PageInterface {
  params: { albumId: string };
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const { albumId } = params || {};
  const page = Number(searchParams?.page || 1);

  const [album, albumTracks]: [AlbumInterface, AlbumTracksInterface] = await Promise.all([
    getAlbumById(albumId),
    getAlbumTracks(albumId, page, 40),
  ]);

  const { items, total, limit } = albumTracks || {};

  return (
    <Container>
      <Breadcrumbs config={{ 1: { href: `/albums/${albumId}`, name: album.name } }} />
      <BannerAlbum album={album} />

      <Wrapper>
        {items?.length > 0 && (
          <Section title={'Album Tracks'}>
            <TrackTable showPopularity={false}>
              {items?.map((track) => <TrackRow key={track.id} track={{ ...track, album }} />)}
            </TrackTable>
          </Section>
        )}
      </Wrapper>
      <Pagination currentPage={page} totalPages={Math.ceil(total / limit)} navigate />
    </Container>
  );
};

export default Page;
