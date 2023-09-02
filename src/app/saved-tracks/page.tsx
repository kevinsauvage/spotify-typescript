import Track, { TrackInterface } from '@/components/Track/Track';
import { getEndpointSavedTracks } from '@/lib/Spotify';

import styles from './page.module.scss';

interface UserSavedTracksInterface {
  items: [{ track: TrackInterface }];
}

export default async function page() {
  const savedTracks: UserSavedTracksInterface = await getEndpointSavedTracks(50);

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <h1>Saved Tracks</h1>
      </div>
      <ul className={styles.list}>
        {Array.isArray(savedTracks?.items) &&
          savedTracks?.items?.map((track) => <Track key={track?.track?.id} track={track?.track} />)}
      </ul>
    </div>
  );
}
