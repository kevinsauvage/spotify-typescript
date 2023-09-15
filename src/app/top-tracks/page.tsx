import FiltersPeriod from '@/components/_scopes/Listing/FiltersPeriod/FiltersPeriod';
import ListingBanner from '@/components/_scopes/Listing/ListingBanner/ListingBanner';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackList from '@/components/_scopes/Listing/TrackList/TrackList';
import { TrackInterface } from '@/components/Track/Track';
import { getEndpointTopTracks } from '@/lib/Spotify/user';

export interface UserTopTrackInterface {
  items: TrackInterface[];
  total: number;
  limit: number;
  offset: number;
  next: string;
  previous: string;
}
interface PageInterface {
  params: object;
  searchParams: { period: string; page?: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const period = searchParams?.period || undefined;
  const page = Number(searchParams.page || 1);

  const topTracks: UserTopTrackInterface = await getEndpointTopTracks(page, period);

  return (
    <div>
      <ListingBanner title="Top Tracks" />
      <FiltersPeriod path="/top-tracks" period={period} />
      <TrackList tracks={topTracks?.items} />
      <Pagination
        currentPage={page}
        totalPages={Math.floor(topTracks?.total / topTracks?.limit)}
        navigate
      />
    </div>
  );
};

export default Page;
