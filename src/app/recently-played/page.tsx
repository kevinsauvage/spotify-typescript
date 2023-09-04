import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { TrackInterface } from '@/components/Track/Track';
import TrackList from '@/components/TrackList/TrackList';
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
