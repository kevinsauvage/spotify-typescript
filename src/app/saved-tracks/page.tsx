import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import List from '@/components/List/List';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointSavedTracks } from '@/lib/Spotify/user';
import { TrackInterface } from '@/types';

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
        <List>
          {savedTracks?.items?.map((track) => (
            <TrackRow key={track.track.id} track={track.track} />
          ))}
        </List>
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
