import { enpointBaseUrl, fetchHelper } from '.';

const defaultLimit = 20;

export const getEnpointPlaylist = async (playlistId: string) => {
  const url = `${enpointBaseUrl}/playlists/${playlistId}`;
  return fetchHelper(url);
};

export const getPlaylistTracks = async (playlistId: string, page: number) => {
  const offset = (page - 1) * defaultLimit;
  const url = `${enpointBaseUrl}/playlists/${playlistId}/tracks?limit=${defaultLimit}&offset=${offset}`;
  return fetchHelper(url);
};

export const createPlaylist = async (
  name: string,
  description: string,
  isPublic: boolean,
  userId: string,
) => {
  'use server';

  const url = `${enpointBaseUrl}/users/${userId}/playlists`;
  const body = JSON.stringify({
    description,
    name,
    public: isPublic,
  });
  return fetchHelper(url, {
    body,
    method: 'POST',
  });
};

export const addItemsToPlaylist = async (playlistId: string, uris: string[]) => {
  'use server';

  const url = `${enpointBaseUrl}/playlists/${playlistId}/tracks`;
  const body = JSON.stringify({ uris });
  return fetchHelper(url, {
    body,
    method: 'POST',
  });
};
