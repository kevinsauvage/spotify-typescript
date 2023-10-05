import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import AudioAnalysis from '@/components/_scopes/Track/AudioAnalysis/AudioAnalysis';
import ChartComponent from '@/components/_scopes/Track/Chart/Chart';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import { getArtistTopTracks } from '@/lib/Spotify/artist';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { getAudioAnalysis, getAudioFeatures, getTrack } from '@/lib/Spotify/track';
import { AudioAnalysisInterface, AudioFeaturesInterface, TrackInterface } from '@/types';

interface PageInterface {
  params: { trackId: string };
  searchParams: object;
}

const Page: React.FC<PageInterface> = async ({ params }) => {
  const { trackId } = params || {};

  const [audioFeatures, recommendedTracks, track]: [
    AudioFeaturesInterface,
    { tracks: TrackInterface[] },
    TrackInterface,
  ] = await Promise.all([
    getAudioFeatures(trackId),
    getRecommendations({ limit: 10, seedTracks: trackId }),
    getTrack(trackId),
  ]);

  const artistToTracks = await getArtistTopTracks(track?.artists?.[0]?.id);

  return (
    <Container>
      {artistToTracks?.tracks?.length > 0 && (
        <Section title="Artist Top Tracks">
          <TrackTable>
            {artistToTracks?.tracks
              ?.slice(0, 5)
              .map((topTrack: TrackInterface) => <TrackRow key={topTrack.id} track={topTrack} />)}
          </TrackTable>
        </Section>
      )}
      {audioFeatures && (
        <Section title="Track Analysis">
          <AudioAnalysis audioFeatures={audioFeatures} />
        </Section>
      )}

      {audioFeatures && (
        <Section title="Audio Features">
          <ChartComponent audioFeatures={audioFeatures} />
        </Section>
      )}

      {recommendedTracks?.tracks?.length > 0 && (
        <Section title="Recommended Tracks" href={`/tracks/${trackId}/recommendations`}>
          <TrackTable>
            {recommendedTracks?.tracks?.map((trackRecommend: TrackInterface) => (
              <TrackRow key={trackRecommend.id} track={trackRecommend} />
            ))}
          </TrackTable>
        </Section>
      )}
    </Container>
  );
};

export default Page;
