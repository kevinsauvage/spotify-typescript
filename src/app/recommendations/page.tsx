import ListingBanner from '@/components/_scopes/Listing/ListingBanner/ListingBanner';
import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';

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
