import ProfilBanner from '@/components/_banners/ProfilBanner/ProfilBanner';
import BrowzeCategories from '@/components/_sections/BrowzeCategories/BrowzeCategories';
import FeaturedPlaylists from '@/components/_sections/FeaturedPlaylists/FeaturedPlaylists';
import NewAlbums from '@/components/_sections/NewAlbums/NewAlbums';
import RecentlyPlayedTracks from '@/components/_sections/RecentlyPlayedTracks/RecentlyPlayedTracks';
import RecommendedTracks from '@/components/_sections/RecommendedTracks/RecommendedTracks';
import TopArtists from '@/components/_sections/TopArtists/TopArtists';
import UserTopTrack from '@/components/_sections/TopTracks/TopTracks';
import Container from '@/components/Container/Container';
import Wrapper from '@/components/Wrapper/Wrapper';
import { getNewRelease } from '@/lib/Spotify/album';
import { getBrowseCategories, getFeaturedPlaylists } from '@/lib/Spotify/playlist';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import {
  getEndpointRecentTracks,
  getEndpointTopArtists,
  getEndpointTopTracks,
} from '@/lib/Spotify/user';
import {
  BrowzeCategoriesResponse,
  FeaturedPlaylistInterface,
  NewReleasesAlbums,
  RecentlyPlayedInterface,
  TrackInterface,
  UserTopArtistInterface,
  UserTopTrackInterface,
} from '@/types';

const page: React.FC = async () => {
  const [
    userTopArtists,
    userTopTracks,
    recentlyPlayedTracks,
    newReleases,
    featuredPlaylists,
    browzeCategories,
  ]: [
    UserTopArtistInterface,
    UserTopTrackInterface,
    RecentlyPlayedInterface,
    NewReleasesAlbums,
    FeaturedPlaylistInterface,
    BrowzeCategoriesResponse,
  ] = await Promise.all([
    getEndpointTopArtists(undefined, 'short_term', 12),
    getEndpointTopTracks(undefined, 'short_term', 6),
    getEndpointRecentTracks(6),
    getNewRelease('US', 1, 12),
    getFeaturedPlaylists('US', 1, 12),
    getBrowseCategories('US', 1, 12),
  ]);

  const get5RandomTracksIds = (tracks: TrackInterface[]) => {
    if (!Array.isArray(tracks)) return;
    const randomTracks: TrackInterface[] = [];
    for (let index = 0; index < 5; index++) {
      const randomTrack = tracks?.[Math.floor(Math.random() * tracks?.length)];
      randomTracks.push(randomTrack);
    }
    return randomTracks.map((track) => track.id).join(',');
  };

  const recommendations: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 12,
    seedTracks: get5RandomTracksIds(userTopTracks?.items),
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
  ];

  return (
    <Container>
      <ProfilBanner bannerData={bannerData} />
      <Wrapper>
        <UserTopTrack tracks={userTopTracks.items} />
        <RecentlyPlayedTracks recentlyPlayedTracks={recentlyPlayedTracks} />
      </Wrapper>
      <BrowzeCategories
        browseCategories={browzeCategories?.categories?.items}
        href="/playlists/categories"
        title="Playlists Categories"
      />
      <RecommendedTracks recommendations={recommendations} title="Tracks You May Like" />
      <TopArtists userTopArtists={userTopArtists} />
      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />
      <NewAlbums newReleases={newReleases} />
    </Container>
  );
};

export default page;
