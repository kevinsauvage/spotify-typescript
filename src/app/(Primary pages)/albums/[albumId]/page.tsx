import BannerAlbum from '@/components/_banners/BannerAlbum/BannerAlbum';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Wrapper from '@/components/Wrapper/Wrapper';
import { getAlbumById, getAlbumTracks } from '@/lib/Spotify/album';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { AlbumInterface, AlbumTracksInterface, TrackInterface } from '@/types';

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

  const seedTracks = items
    ? [...items]
        ?.sort((track) => track.popularity)
        .slice(0, 5)
        .map((track) => track.id)
        .join(',')
    : undefined;

  const recommendations: { tracks: TrackInterface[] } = await getRecommendations({
    limit: album?.tracks?.items?.length,
    seedTracks,
  });

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
        {recommendations?.tracks?.length > 0 && (
          <Section title={'Recommended Tracks'}>
            <TrackTable>
              {recommendations?.tracks?.map((track) => <TrackRow key={track.id} track={track} />)}
            </TrackTable>
          </Section>
        )}
      </Wrapper>
      <Pagination currentPage={page} totalPages={Math.floor(total / limit)} navigate />
    </Container>
  );
};

export default Page;
