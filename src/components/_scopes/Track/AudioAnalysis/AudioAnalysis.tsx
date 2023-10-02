import { AudioAnalysisInterface } from '@/types';
import { getMinuteFromSeconds } from '@/utils/date';

import styles from './AudioAnalysis.module.scss';

const AudioAnalysis: React.FC<{
  audioAnalysis: AudioAnalysisInterface;
}> = ({ audioAnalysis }) => {
  const trackAnalysis = audioAnalysis.track;

  const tableData = [
    { attribute: 'Duration', value: getMinuteFromSeconds(trackAnalysis?.duration) },
    { attribute: 'Tempo', value: trackAnalysis?.tempo.toString().split('.')[0].toString() },
    { attribute: 'Bars', value: audioAnalysis?.bars?.length },
    { attribute: 'Beats', value: audioAnalysis?.beats?.length },
    { attribute: 'Sections', value: audioAnalysis?.sections?.length },
    { attribute: 'Segments', value: audioAnalysis?.segments?.length },
    { attribute: 'Tatums', value: audioAnalysis?.tatums?.length },
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
