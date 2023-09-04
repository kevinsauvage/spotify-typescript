import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { TrackInterface } from '@/components/Track/Track';
import TrackList from '@/components/TrackList/TrackList';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { getTrack } from '@/lib/Spotify/track';

interface PageInterface {
  params: { trackId: string };
  searchParams: object;
}

const page: React.FC<PageInterface> = async ({ params }) => {
  const trackId = params?.trackId;
  const track = (await getTrack(trackId)) || '';

  const recommencedTracks: { tracks: [TrackInterface] } = await getRecommendations({
    seedArtists: '',
    seedGenres: '',
    seedTracks: trackId,
  });

  const { name, artists } = track || {};

  return (
    <div>
      <ListingBanner
        title={
          <>
            Recommendations for <strong>{name}</strong> by <strong>{artists?.[0]?.name}</strong>
          </>
        }
      />

      <TrackList tracks={recommencedTracks?.tracks} />
    </div>
  );
};

export default page;
