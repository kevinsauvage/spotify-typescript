import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { TrackInterface } from '@/components/Track/Track';
import TrackList from '@/components/TrackList/TrackList';
import { getEndpointSavedTracks } from '@/lib/Spotify/user';

interface UserSavedTracksInterface {
  items: [{ track: TrackInterface }];
}

const page = async () => {
  const savedTracks: UserSavedTracksInterface = await getEndpointSavedTracks(50);

  return (
    <div>
      <ListingBanner title="Saved Tracks" />
      <TrackList tracks={savedTracks?.items?.map((track) => track?.track)} />
    </div>
  );
};

export default page;
