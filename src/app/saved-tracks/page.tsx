import ListingBanner from '@/components/ListingBanner/ListingBanner';
import Track, { TrackInterface } from '@/components/Track/Track';
import { getEndpointSavedTracks } from '@/lib/Spotify';

import styles from './page.module.scss';

interface UserSavedTracksInterface {
  items: [{ track: TrackInterface }];
}

const page = async () => {
  const savedTracks: UserSavedTracksInterface = await getEndpointSavedTracks(50);

  return (
    <div className={styles.page}>
      <ListingBanner title="Saved Tracks" />
      <ul className={styles.list}>
        {Array.isArray(savedTracks?.items) &&
          savedTracks?.items?.map((track) => <Track key={track?.track?.id} track={track?.track} />)}
      </ul>
    </div>
  );
};

export default page;
