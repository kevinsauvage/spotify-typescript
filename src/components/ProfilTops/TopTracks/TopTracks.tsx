import LinkButton from '@/components/LinkButton/LinkButton';

import Track, { TrackInterface } from '../../Track/Track';

import styles from './TopTracks.module.scss';

export interface UserTopTrackInterface {
  items: [TrackInterface];
}

const TopTracks: React.FC<{
  userTopTracks: UserTopTrackInterface;
}> = ({ userTopTracks }) => (
  <section className={styles.section}>
    <header>
      <b>Top tracks of all time</b>
      <LinkButton href="/top-tracks">View More</LinkButton>
    </header>
    {userTopTracks?.items?.length > 0 ? (
      <ul>
        {userTopTracks?.items?.map((track: TrackInterface) => (
          <Track key={track.id} track={track} />
        ))}
      </ul>
    ) : (
      <div>No tracks found</div>
    )}
  </section>
);

export default TopTracks;
