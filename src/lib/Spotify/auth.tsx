const { spotify_client_id: spotifyClientId = '', spotify_secret: spotifyClientSecret = '' } =
  process.env;

export const refreshAccessToken = async (refreshToken: string) => {
  const parameters = new URLSearchParams();
  parameters.append('grant_type', 'refresh_token');
  parameters.append('refresh_token', refreshToken);
  parameters.append('client_id', spotifyClientId);
  parameters.append('client_secret', spotifyClientSecret);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    body: parameters.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  const data = await response.json();

  return data.access_token ? data : {};
};
