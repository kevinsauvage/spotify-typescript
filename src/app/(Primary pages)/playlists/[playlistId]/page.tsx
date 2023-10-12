import BannerPlaylist from '@/components/_banners/BannerPlaylist/BannerPlaylist';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import AddToPlaylist from '@/components/AddToPlaylist/AddToPlaylist';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Wrapper from '@/components/Wrapper/Wrapper';
import { addItemsToPlaylist, getEnpointPlaylist, getPlaylistTracks } from '@/lib/Spotify/playlist';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { getEndpointMe } from '@/lib/Spotify/user';
import {
  PlaylistResponseInterface,
  PlaylistTracksInterface,
  TrackInterface,
  UserDataInterface,
} from '@/types';

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

  const [playlist, playlistTracks, user]: [
    PlaylistResponseInterface,
    PlaylistTracksInterface,
    UserDataInterface,
  ] = await Promise.all([
    getEnpointPlaylist(params.playlistId),
    getPlaylistTracks(params.playlistId, page),
    getEndpointMe(),
  ]);
  console.log(
    '🚀 ~~~~  file: page.tsx:35 ~~~~  constPage:React.FC<PageInterface>= ~~~~  playlist:',
    playlist,
  );

  const recommendedTracks: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 10,
    seedArtists: '',
    seedGenres: '',
    seedTracks: get5RamdomTracks(playlistTracks) || '',
  });

  return (
    <Container>
      <Breadcrumbs
        config={{ 1: { href: `/playlists/${params.playlistId}`, name: playlist.name } }}
      />
      <BannerPlaylist playlist={playlist} />

      <Wrapper>
        <Section title="Playlist tracks">
          <TrackTable remove={playlist.owner.id === user.id}>
            {playlistTracks?.items?.map((track) => (
              <TrackRow
                key={track.track.id}
                track={track.track}
                playlistId={params.playlistId}
                showDelete={playlist.owner.id === user.id}
              />
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
