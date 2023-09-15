import Track, { TrackInterface } from '../../../Track/Track';

import styles from './TrackList.module.scss';

const TrackList: React.FC<{ tracks: TrackInterface[] }> = ({ tracks }) => (
  <ul className={styles.list}>
    {tracks?.map((track: TrackInterface) => <Track key={track.id} track={track} />)}
  </ul>
);

export default TrackList;
