import Track, { TrackInterface } from '@/components/_cards/Track/Track';
import FiltersPeriod from '@/components/_scopes/Listing/FiltersPeriod/FiltersPeriod';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
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
  const page = Number(searchParams.page ?? 1);

  const topTracks: UserTopTrackInterface = await getEndpointTopTracks(page, period);

  return (
    <div>
      <PageBannerWrapper>
        <Title>Top Tracks</Title>
      </PageBannerWrapper>
      <Container>
        <FiltersPeriod path="/top-tracks" period={period} />
        <TrackList>
          {topTracks?.items?.map((track) => <Track key={track.id} track={track} />)}
        </TrackList>
        <Pagination
          currentPage={page}
          totalPages={Math.floor(topTracks?.total / topTracks?.limit)}
          navigate
        />
      </Container>
    </div>
  );
};

export default Page;
