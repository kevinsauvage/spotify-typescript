import { enpointBaseUrl, fetchHelper } from '.';

export const getArtist = async (artistId: string) => {
  const url = `${enpointBaseUrl}/artists/${artistId}`;
  return fetchHelper(url);
};

export const getArtistTopTracks = async (artistId: string) => {
  const url = `${enpointBaseUrl}/artists/${artistId}/top-tracks?country=US`;
  return fetchHelper(url);
};

export const getArtistRelatedArtists = async (artistId: string) => {
  const url = `${enpointBaseUrl}/artists/${artistId}/related-artists`;
  return fetchHelper(url);
};

export const getArtistAlbums = async (artistId: string, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const url = `${enpointBaseUrl}/artists/${artistId}/albums?limit=${limit}&offset=${offset}`;
  return fetchHelper(url);
};
