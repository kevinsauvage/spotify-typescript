import ProfilBanner from '@/components/_banners/ProfilBanner/ProfilBanner';
import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import PlaylistCard from '@/components/_cards/PlaylistCard/PlaylistCard';
import TrackCard from '@/components/_cards/TrackCard/TrackCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import Wrapper from '@/components/Wrapper/Wrapper';
import { getNewRelease } from '@/lib/Spotify/album';
import { getRecommendations } from '@/lib/Spotify/recommendations';
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
  NewReleasesAlbums,
  RecentlyPlayedInterface,
  SavedAlbumResponseInterface,
  TrackInterface,
  UserPlaylistInterface,
  UserTopArtistInterface,
  UserTopTrackInterface,
} from '@/types';

import { UserSavedTracksInterface } from '../types/index';

const page: React.FC = async () => {
  const [
    userTopArtists,
    userTopTracks,
    followedArtists,
    recentlyPlayedTracks,
    followedPlaylists,
    savedTracks,
    savedAlbums,
    newReleases,
  ]: [
    UserTopArtistInterface,
    UserTopTrackInterface,
    FollowedArtistsInterface,
    RecentlyPlayedInterface,
    UserPlaylistInterface,
    UserSavedTracksInterface,
    SavedAlbumResponseInterface,
    NewReleasesAlbums,
  ] = await Promise.all([
    getEndpointTopArtists(undefined, 'short_term', 10),
    getEndpointTopTracks(undefined, 'short_term', 6),
    getEndpointFollowedArtists(10),
    getEndpointRecentTracks(6),
    getEndpointMePlaylists(1, 10),
    getEndpointSavedTracks(1, 10),
    getEndpointSavedAlbums(1, 10),
    getNewRelease('US', 1, 10),
  ]);

  const recommendations: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 10,
    seedTracks:
      userTopTracks?.items
        ?.slice(0, 5)
        .map((track) => track.id)
        .join(',') || undefined,
  });

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
      <Wrapper>
        {Array?.isArray(userTopTracks?.items) && (
          <Section title="Your Top Tracks" href="/top-tracks">
            <TrackTable>
              {userTopTracks?.items?.map((track) => <TrackRow key={track.id} track={track} />)}
            </TrackTable>
          </Section>
        )}

        {Array?.isArray(recentlyPlayedTracks?.items) && (
          <Section title="Recently Played" href="/recently-played">
            <TrackTable>
              {recentlyPlayedTracks?.items?.map((track) => (
                <TrackRow key={track.track.id} track={track.track} />
              ))}
            </TrackTable>
          </Section>
        )}
      </Wrapper>

      {Array?.isArray(recommendations?.tracks) && (
        <Section title="Tracks You May Like">
          <Grid>
            {recommendations?.tracks?.map((track) => <TrackCard key={track.id} track={track} />)}
          </Grid>
        </Section>
      )}

      {Array?.isArray(userTopArtists?.items) && (
        <Section title="Your Top Artists" href="/top-artists">
          <Grid>
            {userTopArtists?.items.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
          </Grid>
        </Section>
      )}

      {Array?.isArray(newReleases?.albums?.items) && (
        <Section title="New Albums">
          <Grid>
            {newReleases?.albums?.items?.map((album) => <AlbumCard key={album.id} album={album} />)}
          </Grid>
        </Section>
      )}

      {Array?.isArray(followedPlaylists?.items) && (
        <Section title="Your Playlists" href="/playlists">
          <Grid>
            {followedPlaylists?.items?.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </Grid>
        </Section>
      )}

      {Array.isArray(savedTracks?.items) && (
        <Section title="Your Favorite Tracks" href="/tracks">
          <TrackTable>
            {savedTracks?.items?.map((track) => (
              <TrackRow key={track.track.id} track={track.track} />
            ))}
          </TrackTable>
        </Section>
      )}

      {Array.isArray(followedArtists?.artists?.items) && (
        <Section title="Your Favorite Artists" href="/artists">
          <Grid>
            {followedArtists?.artists?.items.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </Grid>
        </Section>
      )}

      {Array.isArray(savedAlbums?.items) && (
        <Section title="your Favorite Albums" href="/albums">
          <Grid>
            {savedAlbums?.items?.map((album) => (
              <AlbumCard key={album.album.id} album={album.album} />
            ))}
          </Grid>
        </Section>
      )}
    </Container>
  );
};

export default page;
