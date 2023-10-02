import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';
import { getAlbumById } from '@/lib/Spotify/album';
import { AlbumInterface } from '@/types';

interface PageInterface {
  params: { albumId: string };
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const albumId = params?.albumId;
  const album: AlbumInterface = await getAlbumById(albumId);

  return (
    <div>
      <RecommendationsPresenter
        searchParams={searchParams}
        trackId={album?.tracks?.items
          ?.slice(0, 5)
          .map((track) => track.id)
          .join(',')}
        title="Recommendations"
        playlistName={`Recommendations for ${album?.name}`}
      />
    </div>
  );
};

export default page;