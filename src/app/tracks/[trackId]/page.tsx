import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import ChartComponent from '@/components/Chart/Chart';
import Container from '@/components/Container/Container';
import List from '@/components/List/List';
import Section from '@/components/Section/Section';
import TrackTable from '@/components/TrackTable/TrackTable';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { getAudioAnalysis, getAudioFeatures, getTrack } from '@/lib/Spotify/track';
import { TrackInterface } from '@/types';
import { getMinuteFromSeconds } from '@/utils/date';

import styles from './page.module.scss';

interface PageInterface {
  params: { trackId: string };
  searchParams: object;
}

const Page: React.FC<PageInterface> = async ({ params }) => {
  const { trackId } = params || {};
  const track: TrackInterface = await getTrack(trackId);
  const [audioAnalysis, audioFeatures] = await Promise.all([
    getAudioAnalysis(trackId),
    getAudioFeatures(trackId),
  ]);

  const recommendedTracks = await getRecommendations({ limit: 10, seedTracks: trackId });
  const { popularity } = track || {};

  const trackAnalysis = audioAnalysis.track;

  const tableData = [
    { attribute: 'Duration', value: getMinuteFromSeconds(trackAnalysis?.duration) },
    { attribute: 'Popularity', value: `${popularity}%` },
    { attribute: 'Tempo', value: trackAnalysis?.tempo.toString().split('.')[0].toString() },
    { attribute: 'Bars', value: audioAnalysis?.bars?.length },
    { attribute: 'Beats', value: audioAnalysis?.beats?.length },
    { attribute: 'Sections', value: audioAnalysis?.sections?.length },
    { attribute: 'Segments', value: audioAnalysis?.segments?.length },
    { attribute: 'Tatums', value: audioAnalysis?.tatums?.length },
  ];

  const data = {
    datasets: [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        data: [
          audioFeatures.acousticness || 0,
          audioFeatures.danceability || 0,
          audioFeatures.energy || 0,
          audioFeatures.valence || 0,
          audioFeatures.instrumentalness || 0,
          audioFeatures.liveness || 0,
          audioFeatures.speechiness || 0,
        ],
        label: 'Audio Features',
      },
    ],
    labels: [
      'Acousticness',
      'Danceability',
      'Energy',
      'Valence',
      'Instrumentalness',
      'Liveness',
      'Speechiness',
    ],
  };

  return (
    <div className={styles.track}>
      <Container>
        {audioAnalysis && (
          <Section title="Track Analysis">
            <div className={styles.tableContainer}>
              {tableData.map((row) => (
                <div key={row.attribute} className={styles.tableBlock}>
                  <p className={styles.value}>{row.value}</p>
                  <p>{row.attribute}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {recommendedTracks?.tracks?.length > 0 && (
          <Section title="Recommended Tracks" href={`/tracks/${track.id}/recommendations`}>
            <TrackTable>
              {recommendedTracks?.tracks?.map((trackRecommend: TrackInterface) => (
                <TrackRow key={trackRecommend.id} track={trackRecommend} />
              ))}
            </TrackTable>
          </Section>
        )}
        <Section title="Audio Features">
          <ChartComponent chart={data} />
        </Section>
      </Container>
    </div>
  );
};

export default Page;
