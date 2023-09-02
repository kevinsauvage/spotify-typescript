import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const {
  spotify_client_id: spotifyClientId = '',
  spotify_redirect_uri: spotifyRedirectUri = '',
  spotify_scope: spotifyScope = '',
} = process.env;

const spotifyConfig: {
  response_type: string;
  client_id: string;
  scope: string;
  redirect_uri: string;
} = {
  client_id: spotifyClientId,
  redirect_uri: spotifyRedirectUri,
  response_type: 'token',
  scope: spotifyScope,
};

const middleware = (request: NextRequest) => {
  const spotifyToken: RequestCookie | undefined = request.cookies.get('spotify_token');

  // We need the user shopify token to access the spotify API
  if (!spotifyToken?.value) {
    const parameters = new URLSearchParams();
    (Object.keys(spotifyConfig) as (keyof typeof spotifyConfig)[]).forEach(
      (key) => spotifyConfig[key] && parameters.set(key, spotifyConfig[key])
    );
    const url = `https://accounts.spotify.com/authorize?${parameters.toString()}`;
    return NextResponse.redirect(url);
  }
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|callbacks).*)'],
};
