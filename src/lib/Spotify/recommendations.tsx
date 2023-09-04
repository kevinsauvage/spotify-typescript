import { enpointBaseUrl, fetchHelper } from '.';

// eslint-disable-next-line import/prefer-default-export
export const getRecommendations = async ({
  seedTracks = '',
  seedArtists = '',
  seedGenres = '',
}: {
  seedTracks: string;
  seedArtists: string;
  seedGenres: string;
}) => {
  const url = `${enpointBaseUrl}/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}`;
  return fetchHelper(url);
};
