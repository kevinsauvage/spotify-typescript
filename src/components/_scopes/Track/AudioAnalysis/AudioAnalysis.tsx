import { AudioFeaturesInterface } from '@/types';
import { getMinuteFromMilliseconds } from '@/utils/date';

import styles from './AudioAnalysis.module.scss';

const AudioAnalysis: React.FC<{
  audioFeatures: AudioFeaturesInterface;
}> = ({ audioFeatures }) => {
  const tableData = [
    { attribute: 'Danceability', value: audioFeatures.danceability },
    { attribute: 'Energy', value: audioFeatures.energy },
    { attribute: 'Key', value: audioFeatures.key },
    { attribute: 'Loudness', value: audioFeatures.loudness },
    { attribute: 'Speechiness', value: audioFeatures.speechiness },
    { attribute: 'Acousticness', value: audioFeatures.acousticness },
    { attribute: 'Instrumentalness', value: audioFeatures.instrumentalness },
    { attribute: 'Liveness', value: audioFeatures.liveness },
    { attribute: 'Valence', value: audioFeatures.valence },
    { attribute: 'Tempo', value: audioFeatures.tempo },
    { attribute: 'Duration', value: getMinuteFromMilliseconds(audioFeatures.duration_ms) },
    { attribute: 'Time Signature', value: audioFeatures.time_signature },
  ];

  return (
    <div className={styles.tableContainer}>
      {tableData.map((row) => (
        <div key={row.attribute} className={styles.tableBlock}>
          <p className={styles.value}>{row.value}</p>
          <p>{row.attribute}</p>
        </div>
      ))}
    </div>
  );
};

export default AudioAnalysis;
