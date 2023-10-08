/* eslint-disable sonarjs/no-nested-template-literals */
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const {
  spotify_client_id: spotifyClientId = '',
  spotify_redirect_uri: spotifyRedirectUri = '',
  spotify_scope: spotifyScope = '',
  spotify_secret: spotifyClientSecret = '',
} = process.env;

const setSpotifyToken = async (token: { access_token: string; expires_in: number }) => {
  console.log('🚀 ~~~~  file: auth.tsx:15 ~~~~  setSpotifyToken ~~~~  token:', token);

  const currentTime = Math.floor(Date.now() / 1000);

  cookies().set({
    httpOnly: true,
    maxAge: token.expires_in,
    name: 'spotify_token',
    value: JSON.stringify({
      expireTime: currentTime + token.expires_in,
      token: token.access_token,
    }),
  });
};

export const setSpotifyRefreshToken = async (token: {
  refresh_token: string;
  expires_in: number;
}) => {
  cookies().set({
    httpOnly: true,
    name: 'spotify_refresh_token',
    value: JSON.stringify({ token: token.refresh_token }),
  });
};

const exchangeCodeForTokens = async (code: string) => {
  if (!code) return;

  const authOptions = {
    body: new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      redirect_uri: spotifyRedirectUri,
    }),
    headers: {
      Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
        'base64',
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  };

  const response = await fetch('https://accounts.spotify.com/api/token', authOptions);

  const data = await response.json();

  console.log('🚀 ~~~~  file: auth.tsx:65 ~~~~  exchangeCodeForTokens ~~~~  data.error:', data);
  if (data.error) throw new Error(data.error);

  const { access_token, refresh_token, expires_in } =
    (data as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    }) || {};

  return {
    access_token,
    expires_in,
    refresh_token,
  };
};

export const loginServerAction = async (code: string) => {
  if (!code) return;
  const { access_token, refresh_token, expires_in } = (await exchangeCodeForTokens(code)) || {};

  if (!access_token || !refresh_token || !expires_in) {
    return;
  }

  await setSpotifyToken({ access_token, expires_in });
  await setSpotifyRefreshToken({ expires_in, refresh_token });

  redirect('/');
};

export const logoutServerAction = () => {
  cookies().delete('spotify_token');
  cookies().delete('spotify_refresh_token');
  redirect('/login');
};

export const redirectToSpotifyLogin = () => {
  const url = new URL(
    `https://accounts.spotify.com/authorize?redirect_uri=${spotifyRedirectUri}&client_id=${spotifyClientId}&scope=${spotifyScope}&response_type=code`,
  );

  redirect(url.href);
};
