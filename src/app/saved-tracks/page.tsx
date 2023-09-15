import { TrackInterface } from '@/components/_cards/Track/Track';
import ListingBanner from '@/components/_scopes/Listing/ListingBanner/ListingBanner';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
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
      <ListingBanner title="Saved Tracks" />
      <TrackList tracks={savedTracks?.items.map((track) => track?.track)} />
      <Pagination
        currentPage={page}
        totalPages={Math.floor(savedTracks?.total / savedTracks?.limit)}
        navigate
      />
    </div>
  );
};

export default Page;
