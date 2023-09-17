import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';

interface PageInterface {
  params: object;
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ searchParams }) => {
  return (
    <div>
      <RecommendationsPresenter
        searchParams={searchParams}
        title="Recommendations playgourd"
        playlistName=""
      />
    </div>
  );
};

export default page;
