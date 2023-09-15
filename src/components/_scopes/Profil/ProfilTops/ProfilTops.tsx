import { UserTopArtistInterface } from '@/app/top-artists/page';
import { UserTopTrackInterface } from '@/app/top-tracks/page';

import { TopArtists } from '../TopArtists/TopArtists';
import TopTracks from '../TopTracks/TopTracks';

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
