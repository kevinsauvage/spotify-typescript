import ProfilBanner from '@/components/_banners/ProfilBanner/ProfilBanner';
import FeaturedPlaylists from '@/components/_sections/FeaturedPlaylists/FeaturedPlaylists';
import NewAlbums from '@/components/_sections/NewAlbums/NewAlbums';
import RecentlyPlayedTracks from '@/components/_sections/RecentlyPlayedTracks/RecentlyPlayedTracks';
import RecommendedTracks from '@/components/_sections/RecommendedTracks/RecommendedTracks';
import SavedAlbums from '@/components/_sections/SavedAlbums/SavedAlbums';
import SavedArtists from '@/components/_sections/SavedArtists/SavedArtists';
import SavedTracks from '@/components/_sections/SavedTracks/SavedTracks';
import TopArtists from '@/components/_sections/TopArtists/TopArtists';
import UserPlaylists from '@/components/_sections/UserPlaylists/UserPlaylists';
import UserTopTrack from '@/components/_sections/UserTopTrack/UserTopTrack';
import Container from '@/components/Container/Container';
import Wrapper from '@/components/Wrapper/Wrapper';
import { getNewRelease } from '@/lib/Spotify/album';
import { getFeaturedPlaylists } from '@/lib/Spotify/playlist';
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
  FeaturedPlaylistInterface,
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
    featuredPlaylists,
  ]: [
    UserTopArtistInterface,
    UserTopTrackInterface,
    FollowedArtistsInterface,
    RecentlyPlayedInterface,
    UserPlaylistInterface,
    UserSavedTracksInterface,
    SavedAlbumResponseInterface,
    NewReleasesAlbums,
    FeaturedPlaylistInterface,
  ] = await Promise.all([
    getEndpointTopArtists(undefined, 'short_term', 10),
    getEndpointTopTracks(undefined, 'short_term', 6),
    getEndpointFollowedArtists(10),
    getEndpointRecentTracks(6),
    getEndpointMePlaylists(1, 10),
    getEndpointSavedTracks(1, 10),
    getEndpointSavedAlbums(1, 10),
    getNewRelease('US', 1, 10),
    getFeaturedPlaylists('US', 1, 10),
  ]);

  const get5RandomTracksIds = (tracks: TrackInterface[]) => {
    const randomTracks: TrackInterface[] = [];
    for (let index = 0; index < 5; index++) {
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      randomTracks.push(randomTrack);
    }
    return randomTracks.map((track) => track.id).join(',');
  };

  const recommendations: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 10,
    seedTracks: get5RandomTracksIds(userTopTracks.items),
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
      href: `/tracks/${userTopTracks?.items?.[1]?.id}`,
      image: userTopTracks?.items?.[1]?.album?.images?.[0]?.url,
      title: userTopTracks?.items?.[1]?.name,
    },
    {
      href: `/artists/${userTopArtists?.items?.[1]?.id}`,
      image: userTopArtists?.items?.[1]?.images?.[0]?.url,
      title: userTopArtists?.items?.[1]?.name,
    },
    {
      href: `/tracks/${recentlyPlayedTracks?.items?.[0]?.track?.id}`,
      image: recentlyPlayedTracks?.items?.[0]?.track?.album?.images?.[0]?.url,
      title: recentlyPlayedTracks?.items?.[0]?.track?.name,
    },
    {
      href: `/tracks/${recentlyPlayedTracks?.items?.[1]?.track?.id}`,
      image: recentlyPlayedTracks?.items?.[1]?.track?.album?.images?.[0]?.url,
      title: recentlyPlayedTracks?.items?.[1]?.track?.name,
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
    {
      href: `/tracks/${savedTracks?.items?.[0]?.track?.id}`,
      image: savedTracks?.items?.[0]?.track?.album?.images?.[0]?.url,
      title: savedTracks?.items?.[0]?.track?.name,
    },
  ];

  return (
    <Container>
      <ProfilBanner bannerData={bannerData} />
      <Wrapper>
        <UserTopTrack tracks={userTopTracks.items} />
        <RecentlyPlayedTracks recentlyPlayedTracks={recentlyPlayedTracks} />
      </Wrapper>
      <RecommendedTracks recommendations={recommendations} />
      <SavedTracks savedTracks={savedTracks} />
      <TopArtists userTopArtists={userTopArtists} />
      <SavedArtists followedArtists={followedArtists} />
      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />
      <UserPlaylists followedPlaylists={followedPlaylists} />
      <NewAlbums newReleases={newReleases} />
      <SavedAlbums savedAlbums={savedAlbums} />
    </Container>
  );
};

export default page;
