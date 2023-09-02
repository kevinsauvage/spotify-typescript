import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const enpointUserBaseUrl = 'https://api.spotify.com/v1/me';

const endpointPlaylists = `${enpointUserBaseUrl}/playlists`;
const endpointTopArtists = `${enpointUserBaseUrl}/top/artists`;
const endpointTopTracks = `${enpointUserBaseUrl}/top/tracks`;
const endpointRecentTracks = `${enpointUserBaseUrl}/player/recently-played`;
const endpointSavedAlbums = `${enpointUserBaseUrl}/albums`;
const endpointSavedTracks = `${enpointUserBaseUrl}/tracks`;
const endpointFollowedArtists = `${enpointUserBaseUrl}/following?type=artist`;

const fetchHelper = async (endpoint: string, options: object = {}) => {
  try {
    const cookieStore = cookies();
    const spotifyToken = cookieStore.get('spotify_token');

    if (!spotifyToken) {
      console.error('spotify token missing');
      redirect('/');
    }

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${spotifyToken?.value}` },
      method: 'GET',
      ...options,
    });

    if (response?.status >= 200 && response?.status < 300) {
      return response?.json();
    }

    // TODO: handle error response

    console.error(response);
  } catch (error) {
    console.error(error);
  }
};

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
