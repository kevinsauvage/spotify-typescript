import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';
import { getArtist } from '@/lib/Spotify/artist';

interface PageInterface {
  params: { artistId: string };
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const artistId = params?.artistId;
  const artist = await getArtist(artistId);

  const title = (
    <>
      Recommendations for <strong>{artist?.name}</strong>
    </>
  );

  return (
    <div>
      <RecommendationsPresenter
        searchParams={searchParams}
        artistId={artistId}
        title={title}
        playlistName={`Recommendations for ${artist?.name}`}
      />
    </div>
  );
};

export default page;
