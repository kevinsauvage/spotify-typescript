import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import TrackTable from '@/components/TrackTable/TrackTable';
import { getEndpointSavedTracks } from '@/lib/Spotify/user';
import { UserSavedTracksInterface } from '@/types';

interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const page = Number(searchParams.page || 1);
  const savedTracks: UserSavedTracksInterface = await getEndpointSavedTracks(page);

  return (
    <Container>
      <PageBannerWrapper>
        <Title>Favorite Tracks</Title>
      </PageBannerWrapper>
      <TrackTable>
        {savedTracks?.items?.map((track) => <TrackRow key={track.track.id} track={track.track} />)}
      </TrackTable>
      <Pagination
        currentPage={page}
        totalPages={Math.floor(savedTracks?.total / savedTracks?.limit)}
        navigate
      />
    </Container>
  );
};

export default Page;
