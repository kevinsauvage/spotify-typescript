import { enpointBaseUrl, fetchHelper } from '.';

// eslint-disable-next-line import/prefer-default-export
export const getRecommendations = async ({
  seedTracks = '',
  seedArtists = '',
  seedGenres = '',
  otherParams: otherParameters = '',
}: {
  seedTracks: string;
  seedArtists: string;
  seedGenres: string;
  otherParams: string;
}) => {
  if (!seedTracks && !seedArtists && !seedGenres && !otherParameters) {
    return console.warn('No seed tracks, artists, or genres provided');
  }
  const url = `${enpointBaseUrl}/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}&${otherParameters}`;
  return fetchHelper(url);
};

export const getAvailableGenreSeeds = async () => {
  const url = `${enpointBaseUrl}/recommendations/available-genre-seeds`;
  return fetchHelper(url);
};
