import { enpointBaseUrl, fetchHelper } from '.';

const enpointUserBaseUrl = `${enpointBaseUrl}/me`;

const endpointPlaylists = `${enpointUserBaseUrl}/playlists`;
const endpointTopArtists = `${enpointUserBaseUrl}/top/artists`;
const endpointTopTracks = `${enpointUserBaseUrl}/top/tracks`;
const endpointRecentTracks = `${enpointUserBaseUrl}/player/recently-played`;
const endpointSavedAlbums = `${enpointUserBaseUrl}/albums`;
const endpointSavedTracks = `${enpointUserBaseUrl}/tracks`;
const endpointFollowedArtists = `${enpointUserBaseUrl}/following?type=artist`;

export const getEndpointMe = async () => fetchHelper(enpointUserBaseUrl);
export const getEndpointMePlaylists = async () => fetchHelper(endpointPlaylists);

export const getEndpointTopArtists = async (limit = 10, period = 'long_term') => {
  const url = `${endpointTopArtists}?time_range=${period}&limit=${limit}`;
  return fetchHelper(url);
};

export const getEndpointTopTracks = async (limit = 10, period = 'long_term') => {
  const url = `${endpointTopTracks}?time_range=${period}&limit=${limit}`;
  return fetchHelper(url);
};

export const getEndpointRecentTracks = async (limit = 10) =>
  fetchHelper(`${endpointRecentTracks}?limit=${limit}`);

export const getEndpointFollowedArtists = async (limit = 10) =>
  fetchHelper(`${endpointFollowedArtists}&limit=${limit}`);

export const getEndpointSavedTracks = async (limit = 10) =>
  fetchHelper(`${endpointSavedTracks}?limit=${limit}`);

export const getEndpointSavedAlbums = async () => fetchHelper(endpointSavedAlbums);

export const getStats = async () => {
  const [savedTracks, followedArtists, userInfo] = await Promise.all([
    getEndpointSavedTracks(1),
    getEndpointFollowedArtists(1),
    getEndpointMe(),
  ]);

  return [
    { title: 'Saved Tracks', value: Number(savedTracks?.total || 0) },
    { title: 'Followed Artists', value: Number(followedArtists?.artists?.total || 0) },
    { title: 'Followers', value: Number(userInfo?.followers?.total || 0) },
  ];
};
