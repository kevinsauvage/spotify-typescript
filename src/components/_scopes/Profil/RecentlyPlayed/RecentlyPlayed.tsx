import { RecentlyPlayedInterface } from '@/app/recently-played/page';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';

import ProfilTopsHeader from '../ProfilTopsHeader/ProfilTopsHeader';

import styles from './RecentlyPlayed.module.scss';

const RecentlyPlayed: React.FC<{
  recentlyPlayedTracks: RecentlyPlayedInterface;
}> = ({ recentlyPlayedTracks }) =>
  recentlyPlayedTracks?.items?.length > 0 && (
    <section className={styles.section}>
      <ProfilTopsHeader title="Recently Played" href="/recently-played" />
      <TrackList tracks={recentlyPlayedTracks?.items.map((track) => track.track)} />
    </section>
  );

export default RecentlyPlayed;
