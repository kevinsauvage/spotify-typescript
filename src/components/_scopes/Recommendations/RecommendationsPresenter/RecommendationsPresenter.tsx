import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Container from '@/components/Container/Container';
import CreatePlaylist from '@/components/CreatePlaylist/CreatePlaylist';
import List from '@/components/List/List';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import TrackTable from '@/components/TrackTable/TrackTable';
import { addItemsToPlaylist, createPlaylist } from '@/lib/Spotify/playlist';
import { getAvailableGenreSeeds, getRecommendations } from '@/lib/Spotify/recommendations';
import { getEndpointMe } from '@/lib/Spotify/user';
import { TrackInterface } from '@/types';

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
    <Container>
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
      <TrackAttributeForm
        genres={availableGenreSeeds?.genres}
        initialParams={rest}
        seedGenres={seedGenres ? seedGenres?.split(',') : []}
      />
      <TrackTable>
        {recommencedTracks?.tracks?.map((track) => <TrackRow key={track.id} track={track} />)}
      </TrackTable>
    </Container>
  );
};

export default RecommendationsPresenter;
