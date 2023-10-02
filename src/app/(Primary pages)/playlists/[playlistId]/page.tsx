import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Container from '@/components/Container/Container';
import { getPlaylistTracks } from '@/lib/Spotify/playlist';
import { PlaylistTracksInterface } from '@/types';

interface PageInterface {
  params: { playlistId: string };
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const page = Number(searchParams.page || 1);

  const playlistTracks: PlaylistTracksInterface = await getPlaylistTracks(params.playlistId, page);

  return (
    <Container>
      <TrackTable remove>
        {playlistTracks?.items?.map((track) => (
          <TrackRow key={track.track.id} track={track.track} playlistId={params.playlistId} />
        ))}
      </TrackTable>
      <Pagination
        currentPage={page}
        totalPages={Math.floor(playlistTracks?.total / playlistTracks?.limit)}
        navigate
      />
    </Container>
  );
};

export default Page;
