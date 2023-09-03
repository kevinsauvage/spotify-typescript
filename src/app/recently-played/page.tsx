import ListingBanner from '@/components/ListingBanner/ListingBanner';
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
      <ListingBanner title="Recently Played Tracks" />

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
