import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import PlaylistCard from '@/components/_cards/PlaylistCard/PlaylistCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import ProfilBanner from '@/components/_scopes/Profil/ProfilBanner/ProfilBanner';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import List from '@/components/List/List';
import Section from '@/components/Section/Section';
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
        <Section title="Top Tracks" href="/top-tracks">
          <List>
            {userTopTracks?.items?.map((track) => <TrackRow key={track.id} track={track} />)}
          </List>
        </Section>

        <Section title="Top Artists" href="/top-artists">
          <Grid>
            {userTopArtists?.items.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
          </Grid>
        </Section>

        <Section title="Recently Played" href="/recently-played">
          <List>
            {recentlyPlayedTracks?.items?.map((track) => (
              <TrackRow key={track.track.id} track={track.track} />
            ))}
          </List>
        </Section>

        <Section title="Playlists" href="/playlists">
          <Grid>
            {followedPlaylists?.items?.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </Grid>
        </Section>
      </Container>
    </div>
  );
};

export default page;
