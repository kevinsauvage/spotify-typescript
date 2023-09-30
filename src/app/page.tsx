import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import PlaylistCard from '@/components/_cards/PlaylistCard/PlaylistCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import ProfilBanner from '@/components/_scopes/Profil/ProfilBanner/ProfilBanner';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import List from '@/components/List/List';
import Section from '@/components/Section/Section';
import {
  getEndpointFollowedArtists,
  getEndpointMePlaylists,
  getEndpointRecentTracks,
  getEndpointSavedAlbums,
  getEndpointSavedTracks,
  getEndpointTopArtists,
  getEndpointTopTracks,
} from '@/lib/Spotify/user';
import {
  FollowedArtistsInterface,
  RecentlyPlayedInterface,
  SavedAlbumResponseInterface,
  UserPlaylistInterface,
  UserTopArtistInterface,
  UserTopTrackInterface,
} from '@/types';

import { UserSavedTracksInterface } from '../types/index';

import styles from './page.module.scss';

const page: React.FC = async () => {
  const [
    userTopArtists,
    userTopTracks,
    followedArtists,
    recentlyPlayedTracks,
    followedPlaylists,
    savedTracks,
    savedAlbums,
  ]: [
    UserTopArtistInterface,
    UserTopTrackInterface,
    FollowedArtistsInterface,
    RecentlyPlayedInterface,
    UserPlaylistInterface,
    UserSavedTracksInterface,
    SavedAlbumResponseInterface,
  ] = await Promise.all([
    getEndpointTopArtists(undefined, undefined, 10),
    getEndpointTopTracks(undefined, undefined, 6),
    getEndpointFollowedArtists(10),
    getEndpointRecentTracks(6),
    getEndpointMePlaylists(1, 10),
    getEndpointSavedTracks(1, 10),
    getEndpointSavedAlbums(1, 10),
  ]);

  const bannerData = [
    {
      href: `/tracks/${userTopTracks?.items?.[0]?.id}`,
      image: userTopTracks?.items?.[0]?.album?.images?.[0]?.url,
      title: userTopTracks?.items?.[0]?.name,
    },
    {
      href: `/artists/${userTopArtists?.items?.[0]?.id}`,
      image: userTopArtists?.items?.[0]?.images?.[0]?.url,
      title: userTopArtists?.items?.[0]?.name,
    },
    {
      href: `/tracks/${recentlyPlayedTracks?.items?.[0]?.track?.id}`,
      image: recentlyPlayedTracks?.items?.[0]?.track?.album?.images?.[0]?.url,
      title: recentlyPlayedTracks?.items?.[0]?.track?.name,
    },
    {
      href: `/artists/${followedArtists?.artists?.items?.[0]?.id}`,
      image: followedArtists?.artists?.items?.[0]?.images?.[0]?.url,
      title: followedArtists?.artists?.items?.[0]?.name,
    },
    {
      href: `/playlists/${followedPlaylists?.items?.[0]?.id}`,
      image: followedPlaylists?.items?.[0]?.images?.[0]?.url,
      title: followedPlaylists?.items?.[0]?.name,
    },
  ];

  return (
    <Container>
      <ProfilBanner bannerData={bannerData} />
      <div className={styles.wrapper}>
        {Array?.isArray(userTopTracks?.items) && (
          <Section title="Top Tracks of all time" href="/top-tracks">
            <List>
              {userTopTracks?.items?.map((track) => <TrackRow key={track.id} track={track} />)}
            </List>
          </Section>
        )}
        {Array?.isArray(recentlyPlayedTracks?.items) && (
          <Section title="Recently Played" href="/recently-played">
            <List>
              {recentlyPlayedTracks?.items?.map((track) => (
                <TrackRow key={track.track.id} track={track.track} />
              ))}
            </List>
          </Section>
        )}
      </div>

      {Array?.isArray(userTopArtists?.items) && (
        <Section title="Top Artists" href="/top-artists">
          <Grid>
            {userTopArtists?.items.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
          </Grid>
        </Section>
      )}
      {Array?.isArray(followedPlaylists?.items) && (
        <Section title="Playlists" href="/playlists">
          <Grid>
            {followedPlaylists?.items?.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </Grid>
        </Section>
      )}
      {Array.isArray(followedArtists?.artists?.items) && (
        <Section title="Favorite Artists" href="/artists">
          <Grid>
            {followedArtists?.artists?.items.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </Grid>
        </Section>
      )}

      {Array.isArray(savedAlbums?.items) && (
        <Section title="Favorite Albums" href="/albums">
          <Grid>
            {savedAlbums?.items?.map((album) => (
              <AlbumCard key={album.album.id} album={album.album} />
            ))}
          </Grid>
        </Section>
      )}

      {Array.isArray(savedTracks?.items) && (
        <Section title="Favorite Tracks" href="/tracks">
          <List>
            {savedTracks?.items?.map((track) => (
              <TrackRow key={track.track.id} track={track.track} />
            ))}
          </List>
        </Section>
      )}
    </Container>
  );
};

export default page;
