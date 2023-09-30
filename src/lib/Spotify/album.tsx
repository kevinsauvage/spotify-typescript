import { fetchHelper } from '.';

const endpointAlbums = `https://api.spotify.com/v1/albums`;

export const getAlbumById = async (id: string) => {
  const url = `${endpointAlbums}/${id}`;
  return fetchHelper(url);
};

export const getAlbumTracks = async (id: string, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const url = `${endpointAlbums}/${id}/tracks?limit=${limit}&offset=${offset}`;
  return fetchHelper(url);
};
