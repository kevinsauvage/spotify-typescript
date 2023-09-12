import Image from 'next/image';
import Link from 'next/link';

import ChartComponent from '@/components/Chart/Chart';
import { TrackInterface } from '@/components/Track/Track';
import { getAudioAnalysis, getAudioFeatures, getTrack } from '@/lib/Spotify/track';
import { getMinuteFromSeconds } from '@/utils/date';

import styles from './page.module.scss';

interface PageInterface {
  params: { trackId: string };
  searchParams: object;
}

const Page: React.FC<PageInterface> = async ({ params }) => {
  const track: TrackInterface = await getTrack(params.trackId);
  const [audioAnalysis, audioFeatures] = await Promise.all([
    getAudioAnalysis(params.trackId),
    getAudioFeatures(params.trackId),
  ]);

  const { name, artists, album, external_urls: externalUrls, popularity } = track || {};
  const { images } = album || {};
  const image = images?.at(0);

  const trackAnalysis = audioAnalysis.track;

  const tableData = [
    { attribute: 'Duration', value: getMinuteFromSeconds(trackAnalysis.duration) },
    { attribute: 'Popularity', value: `${popularity}%` },
    { attribute: 'Tempo', value: trackAnalysis.tempo.toString().split('.')[0].toString() },
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
      <div className={styles.banner}>
        {image && (
          <Image
            className={styles.image}
            alt="Album cover"
            src={image?.url}
            width={image?.width}
            height={image?.height}
          />
        )}

        <div>
          <h1 className={styles.name}>{name}</h1>
          <div className={styles.artists}>
            <strong>Artists: </strong>
            {artists.map((artist, index) => (
              <>
                <Link href={`/artist/${artist.id}`} key={artist.id}>
                  {artist.name}
                </Link>
                {index < artists.length - 1 && <span>, </span>}
              </>
            ))}
          </div>
          <div>
            <p className={styles.albumName}>
              <strong>Album: </strong>
              {album.name}
            </p>
          </div>
          <div className={styles.buttons}>
            <Link href={externalUrls.spotify} target="__blank">
              Play on spotify
            </Link>
            <Link href={`/recommendations/tracks/${track.id}`}>See Track Recommendations</Link>
          </div>
        </div>
      </div>

      {audioAnalysis && (
        <div className={styles.tableContainer}>
          {tableData.map((row) => (
            <div key={row.attribute} className={styles.tableBlock}>
              <p className={styles.value}>{row.value}</p>
              <p>{row.attribute}</p>
            </div>
          ))}
        </div>
      )}

      <ChartComponent chart={data} />
    </div>
  );
};

export default Page;
