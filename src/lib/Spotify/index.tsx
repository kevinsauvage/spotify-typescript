import { getSpotifyToken } from '@/utils/cookies';

export const enpointBaseUrl = 'https://api.spotify.com/v1';

export const fetchHelper = async (endpoint: string, options: object = {}, token: string = '') => {
  try {
    const accessToken = token || getSpotifyToken()?.accessToken || {};

    if (!accessToken) {
      return console.error('spotify token missing');
    }

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
      method: 'GET',
      ...options,
    });

    if (response?.status >= 200 && response?.status < 300) {
      return response?.json();
    }

    // TODO: handle error response

    console.error(response);
    return response;
  } catch (error) {
    return error;
  }
};
