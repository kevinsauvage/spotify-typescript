import TrackList from '@/components/TrackList/TrackList';

import { TrackInterface } from '../../Track/Track';
import ProfilTopsHeader from '../ProfilTopsHeader/ProfilTopsHeader';

import styles from './TopTracks.module.scss';

export interface UserTopTrackInterface {
  items: [TrackInterface];
}

const TopTracks: React.FC<{
  userTopTracks: UserTopTrackInterface;
}> = ({ userTopTracks }) => (
  <section className={styles.section}>
    <ProfilTopsHeader title="Top tracks of all time" href="/top-tracks" />

    {userTopTracks?.items?.length > 0 ? (
      <TrackList tracks={userTopTracks?.items} />
    ) : (
      <div>No tracks found</div>
    )}
  </section>
);

export default TopTracks;
