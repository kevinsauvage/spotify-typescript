import { TrackInterface } from '@/components/_cards/Track/Track';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';
import Container from '@/components/Container/Container';
import CreatePlaylist from '@/components/CreatePlaylist/CreatePlaylist';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { addItemsToPlaylist, createPlaylist } from '@/lib/Spotify/playlist';
import { getAvailableGenreSeeds, getRecommendations } from '@/lib/Spotify/recommendations';
import { getEndpointMe } from '@/lib/Spotify/user';

import TrackAttributeForm from '../TrackAttributeForm/TrackAttributeForm';

interface IProperties {
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
  trackId?: string;
  artistId?: string;
  title: React.JSX.Element | string;
  playlistName: string;
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
  title,
  playlistName,
}) => {
  const { seedArtists, seedGenres, seedTracks, ...rest } = searchParams || {};

  const otherParameters = createSearchParameters(rest);

  const recommencedTracks: { tracks: [TrackInterface] } = await getRecommendations({
    otherParams: otherParameters,
    seedArtists: artistId ?? seedArtists,
    seedGenres,
    seedTracks: trackId ?? seedTracks,
  });

  const availableGenreSeeds: { genres: string[] } = (await getAvailableGenreSeeds()) || [];
  const user = await getEndpointMe();

  return (
    <>
      <PageBannerWrapper>
        <Title>{title}</Title>
        <CreatePlaylist
          tracks={recommencedTracks?.tracks}
          name={playlistName}
          isPublic={true}
          description=""
          user={user}
          createPlaylist={createPlaylist}
          addItemsToPlaylist={addItemsToPlaylist}
        />
      </PageBannerWrapper>
      <Container>
        <TrackAttributeForm
          genres={availableGenreSeeds?.genres}
          initialParams={rest}
          seedGenres={seedGenres ? seedGenres?.split(',') : []}
        />
        <TrackList tracks={recommencedTracks?.tracks} />
      </Container>
    </>
  );
};

export default RecommendationsPresenter;
