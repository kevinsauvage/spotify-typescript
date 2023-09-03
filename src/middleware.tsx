import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const middleware = async (request: NextRequest) => {
  const spotifyToken: RequestCookie | undefined = request.cookies.get('spotify_token');
  const { nextUrl } = request;

  const spotifyTokenParsed = JSON.parse(spotifyToken?.value || '{}');
  const { accessToken } = spotifyTokenParsed || {};

  if (accessToken && nextUrl.pathname.startsWith('/login')) {
    nextUrl.pathname = '/';
    return NextResponse.redirect(nextUrl);
  }

  if (
    !accessToken &&
    (!nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/logout'))
  ) {
    nextUrl.pathname = '/login';
    return NextResponse.redirect(nextUrl);
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|callbacks).*)'],
};
