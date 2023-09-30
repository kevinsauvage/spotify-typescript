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

export const getEndpointMePlaylists = async (page = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  const url = `${endpointPlaylists}?limit=${limit}&offset=${offset}`;
  return fetchHelper(url);
};

export const getEndpointTopArtists = async (page = 1, period = 'long_term', limit: number = 10) => {
  const offset = (page - 1) * limit;
  const url = `${endpointTopArtists}?time_range=${period}&limit=${limit}&offset=${offset}`;
  return fetchHelper(url);
};

export const getEndpointTopTracks = async (page = 1, period = 'long_term', limit: number = 10) => {
  const offset = (page - 1) * limit;
  const url = `${endpointTopTracks}?time_range=${period}&limit=${limit}&offset=${offset}`;
  return fetchHelper(url);
};

export const getEndpointRecentTracks = async (limit = 10) =>
  fetchHelper(`${endpointRecentTracks}?limit=${limit}`);

export const getEndpointFollowedArtists = async (limit = 10, after = '') => {
  'use server';
  let url = `${endpointFollowedArtists}&limit=${limit}`;
  if (after) url += `&after=${after}`;
  return fetchHelper(url);
};

export const getEndpointSavedTracks = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const url = `${endpointSavedTracks}?limit=${limit}&offset=${offset}`;
  return fetchHelper(url);
};

export const getEndpointSavedAlbums = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const url = `${endpointSavedAlbums}?limit=${limit}&offset=${offset}`;
  return fetchHelper(url);
};
