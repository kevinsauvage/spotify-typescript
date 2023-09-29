import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import PlaylistCard from '@/components/_cards/PlaylistCard/PlaylistCard';
import TrackCard from '@/components/_cards/TrackCard/TrackCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import ProfilBanner from '@/components/_scopes/Profil/ProfilBanner/ProfilBanner';
import CardsPresenter from '@/components/CardsPresenter/CardsPresenter';
import Container from '@/components/Container/Container';
import RowsPresenter from '@/components/RowsPresenter/RowsPresenter';
import {
  getEndpointMe,
  getEndpointMePlaylists,
  getEndpointRecentTracks,
  getEndpointTopArtists,
  getEndpointTopTracks,
  getStats,
} from '@/lib/Spotify/user';
import {
  RecentlyPlayedInterface,
  UserDataInterface,
  UserPlaylistInterface,
  UserTopArtistInterface,
  UserTopTrackInterface,
} from '@/types';

import { StatInterface } from '../types/index';

const page: React.FC = async () => {
  const [userData, userTopArtists, userTopTracks, stats, recentlyPlayedTracks, followedPlaylists]: [
    UserDataInterface,
    UserTopArtistInterface,
    UserTopTrackInterface,
    StatInterface[],
    RecentlyPlayedInterface,
    UserPlaylistInterface,
  ] = await Promise.all([
    getEndpointMe(),
    getEndpointTopArtists(undefined, undefined, 10),
    getEndpointTopTracks(undefined, undefined, 10),
    getStats(),
    getEndpointRecentTracks(10),
    getEndpointMePlaylists(1, 10),
  ]);

  return (
    <div>
      <ProfilBanner userData={userData} stats={stats} />
      <Container>
        <RowsPresenter title="Top Tracks" href="/top-tracks">
          {userTopTracks?.items?.map((track) => <TrackRow key={track.id} track={track} />)}
        </RowsPresenter>

        <CardsPresenter title="Top Artists" href="/top-artists">
          {userTopArtists?.items.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
        </CardsPresenter>

        <CardsPresenter title="Recently Played" href="/recently-played">
          {recentlyPlayedTracks?.items?.map((track) => (
            <TrackCard key={track.track.id} track={track.track} />
          ))}
        </CardsPresenter>

        <CardsPresenter title="Playlists" href="/playlists">
          {followedPlaylists?.items?.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </CardsPresenter>
      </Container>
    </div>
  );
};

export default page;
