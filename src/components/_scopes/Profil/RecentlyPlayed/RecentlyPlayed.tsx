import { RecentlyPlayedInterface } from '@/app/recently-played/page';
import Track from '@/components/_cards/Track/Track';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';

import ProfilTopsHeader from '../ProfilTopsHeader/ProfilTopsHeader';

import styles from './RecentlyPlayed.module.scss';

const RecentlyPlayed: React.FC<{
  recentlyPlayedTracks: RecentlyPlayedInterface;
}> = ({ recentlyPlayedTracks }) =>
  recentlyPlayedTracks?.items?.length > 0 && (
    <section className={styles.section}>
      <ProfilTopsHeader title="Recently Played" href="/recently-played" />
      <TrackList>
        {recentlyPlayedTracks?.items?.map((track) => (
          <Track key={track.track.id} track={track.track} />
        ))}
      </TrackList>
    </section>
  );

export default RecentlyPlayed;
