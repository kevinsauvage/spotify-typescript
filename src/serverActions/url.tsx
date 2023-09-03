'use server';

import { redirect } from 'next/navigation';

const {
  spotify_client_id: spotifyClientId = '',
  spotify_redirect_uri: spotifyRedirectUri = '',
  spotify_scope: spotifyScope = '',
} = process.env;

export const redirectUrl = (url: string) => redirect(url);

export const redirectToSpotifyLogin = () => {
  const url = new URL(
    `https://accounts.spotify.com/authorize?redirect_uri=${spotifyRedirectUri}&client_id=${spotifyClientId}&scope=${spotifyScope}&response_type=token`,
  );

  redirect(url.href);
};
