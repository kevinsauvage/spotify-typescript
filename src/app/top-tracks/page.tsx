import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { UserTopTrackInterface } from '@/components/ProfilTops/TopTracks/TopTracks';
import Track from '@/components/Track/Track';
import { getEndpointTopTracks } from '@/lib/Spotify';

import styles from './page.module.scss';

interface PageInterface {
  params: object;
  searchParams: { period: string };
}

const page: React.FC<PageInterface> = async ({ searchParams }) => {
  const period = searchParams?.period || undefined;
  const topTracks: UserTopTrackInterface = await getEndpointTopTracks(50, period);

  return (
    <div className={styles.page}>
      <ListingBanner title="Top Tracks" path="/top-tracks" period={period} />

      <ul className={styles.list}>
        {Array.isArray(topTracks?.items) &&
          topTracks?.items?.map((track) => <Track key={track.id} track={track} />)}
      </ul>
    </div>
  );
};

export default page;
