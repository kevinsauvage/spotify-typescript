import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { UserTopTrackInterface } from '@/components/ProfilTops/TopTracks/TopTracks';
import TrackList from '@/components/TrackList/TrackList';
import { getEndpointTopTracks } from '@/lib/Spotify/user';

interface PageInterface {
  params: object;
  searchParams: { period: string };
}

const page: React.FC<PageInterface> = async ({ searchParams }) => {
  const period = searchParams?.period || undefined;
  const topTracks: UserTopTrackInterface = await getEndpointTopTracks(50, period);

  return (
    <div>
      <ListingBanner title="Top Tracks" path="/top-tracks" period={period} />
      <TrackList tracks={topTracks?.items} />
    </div>
  );
};

export default page;
