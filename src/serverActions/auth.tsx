'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const {
  spotify_client_id: spotifyClientId = '',
  spotify_redirect_uri: spotifyRedirectUri = '',
  spotify_scope: spotifyScope = '',
} = process.env;

export const loginServerAction = async (accessToken: string, expiresIn: number) => {
  const currentTime = Math.floor(Date.now() / 1000);

  cookies().set({
    httpOnly: true,
    maxAge: expiresIn,
    name: 'spotify_token',
    value: JSON.stringify({ accessToken, expiresIn: currentTime + expiresIn }),
  });

  redirect('/');
};

export const logoutServerAction = () => {
  cookies().delete('spotify_token');
  redirect('/login');
};

export const redirectToSpotifyLogin = () => {
  const url = new URL(
    `https://accounts.spotify.com/authorize?redirect_uri=${spotifyRedirectUri}&client_id=${spotifyClientId}&scope=${spotifyScope}&response_type=token`,
  );

  redirect(url.href);
};
