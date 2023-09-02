import Track, { TrackInterface } from '@/components/Track/Track';
import { getEndpointRecentTracks } from '@/lib/Spotify';

import styles from './page.module.scss';

export interface RecentlyPlayedInterface {
  items: [{ track: TrackInterface }];
}
const page: React.FC = async () => {
  const recentlyPlayed: RecentlyPlayedInterface = await getEndpointRecentTracks(50);

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <h1>Recently Played Tracks</h1>
      </div>
      <ul className={styles.list}>
        {Array.isArray(recentlyPlayed?.items) &&
          recentlyPlayed?.items?.map((track) => (
            <Track key={track.track?.id} track={track?.track} />
          ))}
      </ul>
    </div>
  );
};

export default page;
