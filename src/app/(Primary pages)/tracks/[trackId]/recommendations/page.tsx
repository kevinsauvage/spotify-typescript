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

  return (
    <div>
      <RecommendationsPresenter
        searchParams={searchParams}
        trackId={trackId}
        title="Recommendations"
        playlistName={`Recommendations for ${name} by ${artists?.[0]?.name}`}
      />
    </div>
  );
};

export default page;
