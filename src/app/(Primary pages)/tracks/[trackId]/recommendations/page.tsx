import BannerTrack from '@/components/_banners/BannerTrack/BannerTrack';
import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import { getArtist } from '@/lib/Spotify/artist';
import { getTrack } from '@/lib/Spotify/track';

interface PageInterface {
  params: { trackId: string };
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ searchParams, params }) => {
  const trackId = params?.trackId;
  const track = (await getTrack(trackId)) || '';
  const { name, artists } = track || {};
  const artist = await getArtist(artists?.[0]?.id);

  return (
    <>
      <Container>
        <Breadcrumbs config={{ 1: { href: `/tracks/${trackId}`, name } }} />
        <BannerTrack track={track} artist={artist} />
      </Container>
      <RecommendationsPresenter
        searchParams={searchParams}
        trackId={trackId}
        playlistName={`Recommendations for ${name} by ${artists?.[0]?.name}`}
      />
    </>
  );
};

export default page;
