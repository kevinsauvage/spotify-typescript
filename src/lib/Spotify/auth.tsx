import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/* eslint-disable sonarjs/no-nested-template-literals */
const {
  spotify_client_id: spotifyClientId = '',
  spotify_secret: spotifyClientSecret = '',
  spotify_redirect_uri: spotifyRedirectUri = '',
  spotify_token_url: spotifyTokenUrl = '',
  spotify_scope: spotifyScope = '',
  spotify_authorize_url: spotifyAuthorizeUrl = '',
} = process.env;

const grantTypeRefresh = 'refresh_token';

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const parameters = new URLSearchParams();
    parameters.append('grant_type', grantTypeRefresh);
    parameters.append('refresh_token', refreshToken);
    parameters.append('client_id', spotifyClientId);
    parameters.append('client_secret', spotifyClientSecret);

    const response = await fetch(spotifyTokenUrl, {
      body: parameters.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    });

    const data = await response.json();

    if (!data) {
      throw new Error('No data received');
    }

    if (data?.error) {
      const error = new Error(data.error);
      error.message = data.error_description;
      throw error;
    }

    return data.access_token ? data : {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

const exchangeCodeForTokens = async (code: string) => {
  const searchParameters = new URLSearchParams();
  searchParameters.append('code', code);
  searchParameters.append('grant_type', 'authorization_code');
  searchParameters.append('redirect_uri', encodeURI(spotifyRedirectUri));

  const headers = {
    Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64',
    )}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const authOptions = {
    body: searchParameters,
    headers,
    method: 'POST',
  };

  const response = await fetch(spotifyTokenUrl, authOptions);

  const data = response && (await response.json());

  if (!data) {
    throw new Error('No data received');
  }

  if (data?.error) {
    const error = new Error(data.error);
    error.message = data.error_description;
    throw error;
  }

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

export const redirectToSpotifyLogin = async () => {
  'use server';
  const url = new URL(spotifyAuthorizeUrl);

  const searchParameters = new URLSearchParams({
    client_id: spotifyClientId,
    redirect_uri: encodeURI(spotifyRedirectUri),
    response_type: 'code',
    scope: spotifyScope,
  });

  url.search = searchParameters.toString();

  redirect(url.href);
};

export const login = async (code: string) => {
  'use server';
  try {
    if (!code) {
      throw new Error('loginServerAction: No code provided');
    }
    const { access_token, refresh_token, expires_in } = (await exchangeCodeForTokens(code)) || {};

    if (!access_token || !refresh_token || !expires_in) {
      return;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    cookies().set({
      httpOnly: true,
      maxAge: expires_in,
      name: 'spotify_token',
      value: JSON.stringify({
        expireTime: currentTime + expires_in,
        token: access_token,
      }),
    });

    cookies().set({
      httpOnly: true,
      name: 'spotify_refresh_token',
      value: JSON.stringify({ token: refresh_token }),
    });
  } catch (error) {
    console.error(error);
  }
  redirect('/');
};

export const logoutServerAction = async () => {
  'use server';
  cookies().delete('spotify_token');
  cookies().delete('spotify_refresh_token');
  redirect('/login');
};
