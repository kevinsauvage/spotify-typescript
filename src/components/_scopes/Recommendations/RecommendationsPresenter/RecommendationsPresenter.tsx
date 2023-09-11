import { TrackInterface } from '@/components/Track/Track';
import TrackList from '@/components/TrackList/TrackList';
import { getAvailableGenreSeeds, getRecommendations } from '@/lib/Spotify/recommendations';

import TrackAttributeForm from '../TrackAttributeForm/TrackAttributeForm';

interface IProperties {
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
  trackId?: string;
  artistId?: string;
}

const createSearchParameters = (parameters: object) => {
  const searchParameters = new URLSearchParams();
  Object.entries(parameters).forEach(([key, value]) => {
    searchParameters.append(key, value);
  });
  return searchParameters?.toString();
};

const RecommendationsPresenter: React.FC<IProperties> = async ({
  searchParams,
  trackId,
  artistId,
}) => {
  const { seedArtists, seedGenres, seedTracks, ...rest } = searchParams || {};

  const otherParameters = createSearchParameters(rest);

  const recommencedTracks: { tracks: [TrackInterface] } = await getRecommendations({
    otherParams: otherParameters,
    seedArtists: artistId || seedArtists,
    seedGenres,
    seedTracks: trackId || seedTracks,
  });

  const availableGenreSeeds: { genres: string[] } = (await getAvailableGenreSeeds()) || [];

  return (
    <>
      <TrackAttributeForm
        genres={availableGenreSeeds?.genres}
        initialParams={rest}
        seedGenres={seedGenres ? seedGenres?.split(',') : []}
      />
      <TrackList tracks={recommencedTracks?.tracks} />
    </>
  );
};

export default RecommendationsPresenter;
