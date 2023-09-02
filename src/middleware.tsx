import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const {
  spotify_client_id: spotifyClientId = '',
  spotify_redirect_uri: spotifyRedirectUri = '',
  spotify_scope: spotifyScope = '',
} = process.env;

const middleware = (request: NextRequest) => {
  const spotifyToken: RequestCookie | undefined = request.cookies.get('spotify_token');

  // We need the user shopify token to access the spotify API
  if (!spotifyToken?.value) {
    const url = new URL(
      `https://accounts.spotify.com/authorize?redirect_uri=${spotifyRedirectUri}&client_id=${spotifyClientId}&scope=${spotifyScope}&response_type=token`,
    );

    return NextResponse.redirect(url.href);
  }
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|callbacks).*)'],
};
