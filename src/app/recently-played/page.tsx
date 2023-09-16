import { TrackInterface } from '@/components/_cards/Track/Track';
import ListingBanner from '@/components/_scopes/Listing/ListingBanner/ListingBanner';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';
import { getEndpointRecentTracks } from '@/lib/Spotify/user';

export interface RecentlyPlayedInterface {
  items: [{ track: TrackInterface }];
}

const page: React.FC = async () => {
  const recentlyPlayed: RecentlyPlayedInterface = await getEndpointRecentTracks(50);

  return (
    <div>
      <ListingBanner title="Recently Played Tracks" />
      <TrackList tracks={recentlyPlayed?.items?.map((track) => track?.track)} />
    </div>
  );
};

export default page;
