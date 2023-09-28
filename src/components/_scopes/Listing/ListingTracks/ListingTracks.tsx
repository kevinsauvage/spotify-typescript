import { ReactNode } from 'react';

import styles from './ListingTracks.module.scss';

const TrackList: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ul className={styles.list}>{children}</ul>
);

export default TrackList;
