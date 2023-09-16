import { enpointBaseUrl, fetchHelper } from '.';

const endpointPlaylists = `${enpointBaseUrl}/playlists`;

const defaultLimit = 20;

export const getEnpointPlaylist = async (playlistId: string) => {
  const url = `${endpointPlaylists}/${playlistId}`;
  return fetchHelper(url);
};

export const getPlaylistTracks = async (playlistId: string, page: number) => {
  const offset = (page - 1) * defaultLimit;
  const url = `${endpointPlaylists}/${playlistId}/tracks?limit=${defaultLimit}&offset=${offset}`;
  return fetchHelper(url);
};
