import ListingArtists from '@/components/ListingArtists/ListingArtists';
import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { UserTopArtistInterface } from '@/components/ProfilTops/TopArtists/TopArtists';
import { getEndpointTopArtists } from '@/lib/Spotify';

interface PageInterface {
  params: object;
  searchParams: { period: string };
}

const page: React.FC<PageInterface> = async ({ searchParams }) => {
  const period = searchParams?.period || undefined;

  const topArtists: UserTopArtistInterface = await getEndpointTopArtists(50, period);

  return (
    <div>
      <ListingBanner title="Top Artists" path="/top-artists" period={period} />
      <ListingArtists topArtists={topArtists} />
    </div>
  );
};

export default page;
