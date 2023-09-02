import { TopArtists, UserTopArtistInterface } from './TopArtists/TopArtists';
import TopTracks, { UserTopTrackInterface } from './TopTracks/TopTracks';

import styles from './ProfilTops.module.scss';

const ProfilTops: React.FC<{
  userTopArtists: UserTopArtistInterface;
  userTopTracks: UserTopTrackInterface;
}> = ({ userTopArtists, userTopTracks }) => (
  <div className={styles.tops}>
    <TopArtists userTopArtists={userTopArtists} />
    <TopTracks userTopTracks={userTopTracks} />
  </div>
);

export default ProfilTops;
