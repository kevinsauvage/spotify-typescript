import { enpointBaseUrl, fetchHelper } from '.';

const enpointUserBaseUrl = `${enpointBaseUrl}/me`;
const endpointPlaylists = `${enpointUserBaseUrl}/playlists`;
const endpointTopArtists = `${enpointUserBaseUrl}/top/artists`;
const endpointTopTracks = `${enpointUserBaseUrl}/top/tracks`;
const endpointRecentTracks = `${enpointUserBaseUrl}/player/recently-played`;
const endpointSavedAlbums = `${enpointUserBaseUrl}/albums`;
const endpointSavedTracks = `${enpointUserBaseUrl}/tracks`;
const endpointFollowedArtists = `${enpointUserBaseUrl}/following?type=artist`;

const defaultLimit = 20;

export const getEndpointMe = async () => fetchHelper(enpointUserBaseUrl);

export const getEndpointMePlaylists = async (page = 1) => {
  const offset = (page - 1) * defaultLimit;
  const url = `${endpointPlaylists}?limit=${defaultLimit}&offset=${offset}`;
  return fetchHelper(url);
};

export const getEndpointTopArtists = async (page = 1, period = 'long_term', limit: number = 0) => {
  const offset = (page - 1) * (limit || defaultLimit);
  const url = `${endpointTopArtists}?time_range=${period}&limit=${
    limit || defaultLimit
  }&offset=${offset}`;
  return fetchHelper(url);
};

export const getEndpointTopTracks = async (page = 1, period = 'long_term', limit: number = 0) => {
  const offset = (page - 1) * (limit || defaultLimit);
  const url = `${endpointTopTracks}?time_range=${period}&limit=${
    limit || defaultLimit
  }&offset=${offset}`;
  return fetchHelper(url);
};

export const getEndpointRecentTracks = async (limit = 10) =>
  fetchHelper(`${endpointRecentTracks}?limit=${limit}`);

export const getEndpointFollowedArtists = async (limit = 10) =>
  fetchHelper(`${endpointFollowedArtists}&limit=${limit}`);

export const getEndpointSavedTracks = async (page = 1) => {
  const offset = (page - 1) * defaultLimit;
  const url = `${endpointSavedTracks}?limit=${defaultLimit}&offset=${offset}`;
  return fetchHelper(url);
};

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
