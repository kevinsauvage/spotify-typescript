import { UserTopTrackInterface } from '@/app/top-tracks/page';
import Track from '@/components/_cards/Track/Track';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';

import ProfilTopsHeader from '../ProfilTopsHeader/ProfilTopsHeader';

import styles from './TopTracks.module.scss';

const TopTracks: React.FC<{
  userTopTracks: UserTopTrackInterface;
}> = ({ userTopTracks }) => (
  <section className={styles.section}>
    <ProfilTopsHeader title="Top tracks of all time" href="/top-tracks" />

    {userTopTracks?.items?.length > 0 ? (
      <TrackList>
        {userTopTracks?.items?.map((track) => <Track key={track.id} track={track} />)}
      </TrackList>
    ) : (
      <div>No tracks found</div>
    )}
  </section>
);

export default TopTracks;
