import { getSpotifyToken } from '@/serverActions/auth';

export const enpointBaseUrl = 'https://api.spotify.com/v1';

export const fetchHelper = async (endpoint: string, options: object = {}, token: string = '') => {
  try {
    const accessToken = token || getSpotifyToken()?.accessToken || {};

    if (!accessToken) {
      return;
    }

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
      method: 'GET',
      ...options,
      next: { revalidate: 3600 },
    });

    if (!response) return;

    if (response?.status >= 200 && response?.status < 300) {
      return response?.json();
    }

    try {
      const error = await response?.json();

      console.error(error);
    } catch (error) {
      console.error(error);
      return response;
    }

    return response;
  } catch (error) {
    console.log('🚀 ~~~~  file: index.tsx:35 ~~~~  fetchHelper ~~~~  error:', error);

    return error;
  }
};
