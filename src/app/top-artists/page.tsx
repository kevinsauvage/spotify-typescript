import { ArtistInterface } from '@/components/_cards/Artist/Artist';
import FiltersPeriod from '@/components/_scopes/Listing/FiltersPeriod/FiltersPeriod';
import ListingArtists from '@/components/_scopes/Listing/ListingArtists/ListingArtists';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointTopArtists } from '@/lib/Spotify/user';

export interface UserTopArtistInterface {
  items: ArtistInterface[];
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
    <div style={{ width: '100%' }}>
      <PageBannerWrapper>
        <Title>Top Artists</Title>
      </PageBannerWrapper>
      <Container>
        <FiltersPeriod path="/top-artists" period={period} />
        <ListingArtists artists={topArtists.items} />
        <Pagination
          currentPage={page}
          totalPages={Math.floor(topArtists?.total / topArtists?.limit)}
          navigate
        />
      </Container>
    </div>
  );
};

export default Page;
