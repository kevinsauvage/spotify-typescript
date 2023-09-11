import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';
import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { getTrack } from '@/lib/Spotify/track';

interface PageInterface {
  params: { trackId: string };
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ searchParams, params }) => {
  const trackId = params?.trackId;
  const track = (await getTrack(trackId)) || '';
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

      <RecommendationsPresenter searchParams={searchParams} trackId={trackId} />
    </div>
  );
};

export default page;
