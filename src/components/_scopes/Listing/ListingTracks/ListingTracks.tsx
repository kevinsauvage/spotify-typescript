import Track, { TrackInterface } from '../../../_cards/Track/Track';

import styles from './ListingTracks.module.scss';

const TrackList: React.FC<{ tracks: TrackInterface[] }> = ({ tracks }) =>
  Array.isArray(tracks) &&
  tracks.length > 0 && (
    <ul className={styles.list}>
      {tracks?.map((track: TrackInterface) => <Track key={track.id} track={track} />)}
    </ul>
  );

export default TrackList;
