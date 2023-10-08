import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Container from '@/components/Container/Container';
import CreatePlaylist from '@/components/CreatePlaylist/CreatePlaylist';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Section from '@/components/Section/Section';
import Title from '@/components/Title/Title';
import { addItemsToPlaylist, createPlaylist } from '@/lib/Spotify/playlist';
import { getAvailableGenreSeeds, getRecommendations } from '@/lib/Spotify/recommendations';
import { getEndpointMe } from '@/lib/Spotify/user';
import { TrackInterface } from '@/types';

import TrackAttributeForm from '../TrackAttributeForm/TrackAttributeForm';

interface IProperties {
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
  trackId?: string;
  artistId?: string;
  tracks?: string;
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

  const recommencedTracks: { tracks: TrackInterface[] } = await getRecommendations({
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
      <Section>
        <TrackTable>
          {recommencedTracks?.tracks?.map((track) => <TrackRow key={track.id} track={track} />)}
        </TrackTable>
      </Section>
    </Container>
  );
};

export default RecommendationsPresenter;
