import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import FiltersPeriod from '@/components/_scopes/Listing/FiltersPeriod/FiltersPeriod';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import List from '@/components/List/List';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointTopTracks } from '@/lib/Spotify/user';
import { UserTopTrackInterface } from '@/types';

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
        <List>{topTracks?.items?.map((track) => <TrackRow key={track.id} track={track} />)}</List>
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
