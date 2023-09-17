import { TrackInterface } from '@/components/_cards/Track/Track';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointSavedTracks } from '@/lib/Spotify/user';

export interface UserSavedTracksInterface {
  items: [{ track: TrackInterface }];
  total: number;
  limit: number;
  offset: number;
  next: string;
  previous: string;
}

interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const page = Number(searchParams.page || 1);
  const savedTracks: UserSavedTracksInterface = await getEndpointSavedTracks(page);

  return (
    <div>
      <PageBannerWrapper>
        <Title>Saved Tracks</Title>
      </PageBannerWrapper>
      <Container>
        <TrackList tracks={savedTracks?.items.map((track) => track?.track)} />
        <Pagination
          currentPage={page}
          totalPages={Math.floor(savedTracks?.total / savedTracks?.limit)}
          navigate
        />
      </Container>
    </div>
  );
};

export default Page;
