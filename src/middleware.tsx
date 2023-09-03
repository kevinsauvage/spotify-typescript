/* eslint-disable no-param-reassign */
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const noAccessToken = (request: NextRequest) => {
  const { nextUrl } = request || {};
  const { pathname } = nextUrl || {};

  if (!pathname.startsWith('/login') || pathname.startsWith('/logout')) {
    nextUrl.pathname = '/login';
    return NextResponse.redirect(nextUrl);
  }
};

const hasAccessToken = (request: NextRequest) => {
  const { nextUrl } = request;
  const { pathname } = nextUrl || {};

  if (pathname.startsWith('/login')) {
    nextUrl.pathname = '/';
    return NextResponse.redirect(nextUrl);
  }
};

const checkAccessToken = async (request: NextRequest) => {
  const spotifyToken: RequestCookie | undefined = request.cookies.get('spotify_token');
  const spotifyTokenParsed = JSON.parse(spotifyToken?.value || '{}');
  const { accessToken } = spotifyTokenParsed || {};

  if (accessToken) hasAccessToken(request);
  if (!accessToken) noAccessToken(request);
};

const middleware = async (request: NextRequest) => {
  checkAccessToken(request);
  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|callbacks).*)'],
};
