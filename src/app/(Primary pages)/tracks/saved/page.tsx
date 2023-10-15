import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointSavedTracks } from '@/lib/Spotify/user';
import { UserSavedTracksInterface } from '@/types';

const LIMIT = 24;

interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const page = Number(searchParams.page || 1);
  const savedTracks: UserSavedTracksInterface = await getEndpointSavedTracks(page, LIMIT);

  return (
    <Container>
      <Breadcrumbs />
      <PageBannerWrapper>
        <Title>Tracks</Title>
      </PageBannerWrapper>
      <TrackTable>
        {savedTracks?.items?.map((track) => <TrackRow key={track.track.id} track={track.track} />)}
      </TrackTable>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(savedTracks?.total / savedTracks?.limit)}
        navigate
      />
    </Container>
  );
};

export default Page;
