import { cookies } from 'next/headers';

// eslint-disable-next-line import/prefer-default-export
export const getSpotifyToken = () => {
  try {
    const cookieStore = cookies();
    const spotifyTokenString = cookieStore?.get('spotify_token')?.value;

    return JSON.parse(spotifyTokenString || '{}');
  } catch (error) {
    console.error(error);
    return {};
  }
};
