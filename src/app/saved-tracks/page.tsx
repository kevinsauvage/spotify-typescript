import Listing from '@/components/Listing/Listing';
import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { TrackInterface } from '@/components/Track/Track';
import { getEndpointSavedTracks } from '@/lib/Spotify/user';

export interface UserSavedTracksInterface {
  items: [{ track: TrackInterface }];
  track: TrackInterface;
  total: number;
  limit: number;
  offset: number;
  next: string;
  previous: string;
}

const page = async () => {
  const savedTracks: UserSavedTracksInterface = await getEndpointSavedTracks(50);

  return (
    <div>
      <ListingBanner title="Saved Tracks" />
      <Listing tracks={savedTracks} />
    </div>
  );
};

export default page;
