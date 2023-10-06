import { cookies } from 'next/headers';

export const enpointBaseUrl = 'https://api.spotify.com/v1';
const timeoutInSeconds = 3;

export const Timeout = (time: number) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller.signal;
};

export const getSpotifyToken = () => {
  try {
    const cookieStore = cookies();
    const spotifyTokenString = cookieStore?.get('spotify_token')?.value;

    return JSON.parse(spotifyTokenString ?? '{}');
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchHelper = async (
  endpoint: string,
  options: object = {},
  token: string = '',
  timeout: number = timeoutInSeconds,
) => {
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
      signal: Timeout(timeout),
    });

    if (!response?.status) return;

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
    console.error('🚀 ~~~~  file: index.tsx:35 ~~~~  fetchHelper ~~~~  error:', error);
    return error;
  }
};
