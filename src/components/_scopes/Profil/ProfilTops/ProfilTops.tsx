import { RecentlyPlayedInterface } from '@/app/recently-played/page';
import { UserTopArtistInterface } from '@/app/top-artists/page';
import { UserTopTrackInterface } from '@/app/top-tracks/page';

import RecentlyPlayed from '../RecentlyPlayed/RecentlyPlayed';
import { TopArtists } from '../TopArtists/TopArtists';
import TopTracks from '../TopTracks/TopTracks';

import styles from './ProfilTops.module.scss';

const ProfilTops: React.FC<{
  userTopArtists: UserTopArtistInterface;
  userTopTracks: UserTopTrackInterface;
  recentlyPlayedTracks: RecentlyPlayedInterface;
}> = ({ userTopArtists, userTopTracks, recentlyPlayedTracks }) => (
  <div className={styles.tops}>
    <TopArtists userTopArtists={userTopArtists} />
    <TopTracks userTopTracks={userTopTracks} />
    <RecentlyPlayed recentlyPlayedTracks={recentlyPlayedTracks} />
  </div>
);

export default ProfilTops;
