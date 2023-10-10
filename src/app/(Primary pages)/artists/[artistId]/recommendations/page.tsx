import BannerArtist from '@/components/_banners/BannerArtist/BannerArtist';
import RecommendationsPresenter from '@/components/_scopes/Recommendations/RecommendationsPresenter/RecommendationsPresenter';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import { getArtist } from '@/lib/Spotify/artist';

interface PageInterface {
  params: { artistId: string };
  searchParams: { seedArtists: string; seedGenres: string; seedTracks: string };
}

const page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const artistId = params?.artistId;
  const artist = await getArtist(artistId);

  return (
    <>
      <Container>
        <Breadcrumbs config={{ 1: { href: `/artists/${artistId}`, name: artist.name } }} />
        <BannerArtist artist={artist} />
      </Container>

      <RecommendationsPresenter
        searchParams={searchParams}
        artistId={artistId}
        playlistName={`Recommendations for ${artist?.name}`}
      />
    </>
  );
};

export default page;
