import { enpointBaseUrl, fetchHelper } from '.';

export const getRecommendations = async ({
  seedTracks = '',
  seedArtists = '',
  seedGenres = '',
  otherParams: otherParameters = '',
  limit = 100,
}: {
  seedTracks: string;
  seedArtists: string;
  seedGenres: string;
  otherParams: string;
  limit?: number;
}) => {
  if (!seedTracks && !seedArtists && !seedGenres && !otherParameters) {
    return console.warn('No seed tracks, artists, or genres provided');
  }
  const url = `${enpointBaseUrl}/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}&${otherParameters}&limit=${limit}`;
  return fetchHelper(url);
};

export const getAvailableGenreSeeds = async () => {
  const url = `${enpointBaseUrl}/recommendations/available-genre-seeds`;
  return fetchHelper(url);
};
