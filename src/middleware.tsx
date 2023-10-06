import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextURL } from 'next/dist/server/web/next-url';
import { type NextRequest, NextResponse } from 'next/server';

import { refreshAccessToken } from './lib/Spotify/auth';

const hourInecound = 3600;

const handleSpotifyToken = async (
  spotifyToken: { token: string; expireTime: number },
  refreshToken: { token: string },
  nextUrl: NextURL,
  response: NextResponse,
) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired = currentTime - hourInecound > spotifyToken.expireTime;

  console.log('🚀 ~~~~  file: middleware.tsx:18 ~~~~  isExpired:', isExpired);

  if (isExpired) {
    const { access_token, expires_in, refresh_token } = await refreshAccessToken(
      refreshToken.token,
    );

    if (!access_token) {
      nextUrl.pathname = '/login';
      response.cookies.delete('spotify_token');
      return NextResponse.redirect(nextUrl);
    }

    if (expires_in) {
      response.cookies.set({
        httpOnly: true,
        maxAge: expires_in,
        name: 'spotify_token',
        value: JSON.stringify({ expireTime: expires_in + currentTime, token: access_token }),
      });
    }

    if (refresh_token) {
      response.cookies.set({
        httpOnly: true,
        name: 'spotify_refresh_token',
        value: JSON.stringify({ token: refresh_token }),
      });
    }
  }

  return spotifyToken;
};

const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  const { nextUrl, cookies } = request;

  const spotifyToken: RequestCookie | undefined = cookies.get('spotify_token');
  const spotifyRefreshToken: RequestCookie | undefined = cookies.get('spotify_refresh_token');

  const token: { token: string; expireTime: number } = JSON.parse(spotifyToken?.value || '{}');

  console.log('🚀 ~~~~  file: middleware.tsx:60 ~~~~  middleware ~~~~  token:', token);

  const refreshToken: { token: string } = JSON.parse(spotifyRefreshToken?.value || '{}');

  console.log(
    '🚀 ~~~~  file: middleware.tsx:64 ~~~~  middleware ~~~~  refreshToken:',
    refreshToken,
  );

  if (
    !token?.token &&
    (!nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/logout'))
  ) {
    console.log('redirect login 73');
    nextUrl.pathname = '/login';
    return NextResponse.redirect(nextUrl);
  }

  if (token?.token) {
    if (nextUrl.pathname.startsWith('/login')) {
      nextUrl.pathname = '/';
      return NextResponse.redirect(nextUrl);
    }
    await handleSpotifyToken(token, refreshToken, nextUrl, response);
  }

  return response;
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|callbacks).*)'],
};
