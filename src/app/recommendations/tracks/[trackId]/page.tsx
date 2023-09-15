import ListingBanner from '@/components/_scopes/Listing/ListingBanner/ListingBanner';
import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';
import { getTrack } from '@/lib/Spotify/track';

interface PageInterface {
  params: { trackId: string };
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ searchParams, params }) => {
  const trackId = params?.trackId;
  const track = (await getTrack(trackId)) || '';
  const { name, artists } = track || {};

  const title = (
    <>
      Recommendations for <strong>{name}</strong> by <strong>{artists?.[0]?.name}</strong>
    </>
  );

  return (
    <div>
      <ListingBanner title={title} />
      <RecommendationsPresenter searchParams={searchParams} trackId={trackId} />
    </div>
  );
};

export default page;
