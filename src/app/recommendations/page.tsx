import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';
import ListingBanner from '@/components/ListingBanner/ListingBanner';

interface PageInterface {
  params: object;
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ searchParams }) => {
  return (
    <div>
      <ListingBanner title="Recommendations playgourd" />
      <RecommendationsPresenter searchParams={searchParams} />
    </div>
  );
};

export default page;
