import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';
import { getEnpointPlaylist, getPlaylistTracks } from '@/lib/Spotify/playlist';
import { PlaylistResponseInterface, PlaylistTracksInterface } from '@/types';

interface PageInterface {
  params: { playlistId: string };
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ searchParams, params }) => {
  const { playlistId } = params || { playlistId: '' };
  const playlistResponse: PlaylistResponseInterface = await getEnpointPlaylist(playlistId);
  const playlistTracks: PlaylistTracksInterface = await getPlaylistTracks(playlistId, 1);

  const { name, owner } = playlistResponse || {};

  return (
    <RecommendationsPresenter
      searchParams={searchParams}
      trackId={playlistTracks?.items
        ?.slice(0, 5)
        .map((track) => track.track.id)
        .join(',')}
      title="Recommendations"
      playlistName={`Recommendations for ${name} by ${owner?.display_name}`}
    />
  );
};

export default page;
