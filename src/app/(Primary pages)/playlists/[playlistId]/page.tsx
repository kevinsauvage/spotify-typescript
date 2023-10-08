import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import AddToPlaylist from '@/components/AddToPlaylist/AddToPlaylist';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Wrapper from '@/components/Wrapper/Wrapper';
import { addItemsToPlaylist, getPlaylistTracks } from '@/lib/Spotify/playlist';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { PlaylistTracksInterface, TrackInterface } from '@/types';

interface PageInterface {
  params: { playlistId: string };
  searchParams: { page: string };
}

const get5RamdomTracks = (tracks: PlaylistTracksInterface) => {
  const randomTracks = [];

  for (let index = 0; index < 5; index++) {
    const randomTrack = tracks?.items[Math.floor(Math.random() * tracks?.items.length)];
    randomTracks.push(randomTrack?.track?.id);
  }

  return randomTracks.length > 0 ? randomTracks.join(',') : '';
};

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const page = Number(searchParams.page || 1);

  const playlistTracks: PlaylistTracksInterface = await getPlaylistTracks(params.playlistId, page);

  const recommendedTracks: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 10,
    seedArtists: '',
    seedGenres: '',
    seedTracks: get5RamdomTracks(playlistTracks) || '',
  });

  return (
    <Container>
      <Wrapper>
        <Section title="Playlist tracks">
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
        </Section>
        {recommendedTracks?.tracks?.length > 0 && (
          <Section title="Recommended tracks">
            <TrackTable>
              {recommendedTracks?.tracks?.map((track) => <TrackRow key={track.id} track={track} />)}
            </TrackTable>
            <AddToPlaylist
              addItemsToPlaylist={addItemsToPlaylist}
              tracks={recommendedTracks.tracks}
            />
          </Section>
        )}
      </Wrapper>
    </Container>
  );
};

export default Page;
