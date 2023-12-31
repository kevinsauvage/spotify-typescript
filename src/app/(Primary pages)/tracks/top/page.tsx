import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import FiltersPeriod from '@/components/_scopes/Listing/FiltersPeriod/FiltersPeriod';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Section from '@/components/Section/Section';
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

  const topTracks: UserTopTrackInterface = await getEndpointTopTracks(page, period, 30);

  return (
    <Container>
      <Breadcrumbs />
      <PageBannerWrapper>
        <Title>Top Tracks</Title>
      </PageBannerWrapper>
      <Section>
        <FiltersPeriod path="/tracks/top" period={period} />
        <TrackTable>
          {topTracks?.items?.map((track) => <TrackRow key={track.id} track={track} />)}
        </TrackTable>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(topTracks?.total / topTracks?.limit)}
          navigate
        />
      </Section>
    </Container>
  );
};

export default Page;
