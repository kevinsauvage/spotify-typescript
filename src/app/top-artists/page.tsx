import FiltersPeriod from '@/components/_scopes/Listing/FiltersPeriod/FiltersPeriod';
import ListingArtists from '@/components/_scopes/Listing/ListingArtists/ListingArtists';
import ListingBanner from '@/components/_scopes/Listing/ListingBanner/ListingBanner';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import { ArtistInterface } from '@/components/Artist/Artist';
import { getEndpointTopArtists } from '@/lib/Spotify/user';

export interface UserTopArtistInterface {
  items: [ArtistInterface];
  limit: number;
  offset: number;
  total: number;
}
interface PageInterface {
  params: object;
  searchParams: { period: string; page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const period = searchParams?.period || undefined;
  const page = Number(searchParams.page || 1);

  const topArtists: UserTopArtistInterface = await getEndpointTopArtists(page, period);

  return (
    <div>
      <ListingBanner title="Top Artists" />
      <FiltersPeriod path="/top-artists" period={period} />
      <ListingArtists topArtists={topArtists} />
      <Pagination
        currentPage={page}
        totalPages={Math.floor(topArtists?.total / topArtists?.limit)}
        navigate
      />
    </div>
  );
};

export default Page;
