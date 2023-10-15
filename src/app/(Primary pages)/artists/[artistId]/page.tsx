import BannerArtist from '@/components/_banners/BannerArtist/BannerArtist';
import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import Wrapper from '@/components/Wrapper/Wrapper';
import {
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks,
} from '@/lib/Spotify/artist';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { ArtistAlbumsInterface, ArtistInterface, TrackInterface } from '@/types';

interface PageInterface {
  params: { artistId: string };
  searchParams: object;
}

const Page: React.FC<PageInterface> = async ({ params }) => {
  const { artistId } = params || {};

  const [artistTopTracks, relatedArtists, albums, artist]: [
    { tracks: TrackInterface[] },
    { artists: ArtistInterface[] },
    ArtistAlbumsInterface,
    ArtistInterface,
  ] = await Promise.all([
    getArtistTopTracks(artistId),
    getArtistRelatedArtists(artistId),
    getArtistAlbums(artistId, 1, 12),
    getArtist(artistId),
  ]);

  const recommencedTracks: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 10,
    seedArtists: artistId,
  });

  return (
    <Container>
      <Breadcrumbs config={{ 1: { href: `/artists/${artistId}`, name: artist.name } }} />
      <BannerArtist artist={artist} />
      <Wrapper>
        {artistTopTracks?.tracks?.length > 0 && (
          <Section title="Top Tracks">
            <TrackTable>
              {artistTopTracks.tracks.map((track) => (
                <TrackRow key={track.id} track={track} />
              ))}
            </TrackTable>
          </Section>
        )}
        {recommencedTracks?.tracks?.length > 0 && (
          <Section title="Recommended Tracks" href={`/artists/${artistId}/recommendations`}>
            <TrackTable>
              {recommencedTracks.tracks.map((track) => (
                <TrackRow key={track.id} track={track} />
              ))}
            </TrackTable>
          </Section>
        )}
      </Wrapper>
      {albums?.items?.length > 0 && (
        <Section
          title="Albums"
          href={albums.total > albums.limit ? `/artists/${artistId}/albums` : ''}
        >
          <Grid>
            {albums.items.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </Grid>
        </Section>
      )}

      {relatedArtists?.artists?.length > 0 && (
        <Section title="Related Artists">
          <Grid>
            {relatedArtists.artists.slice(0, 12).map((relatedArtist) => (
              <ArtistCard key={relatedArtist.id} artist={relatedArtist} />
            ))}
          </Grid>
        </Section>
      )}
    </Container>
  );
};

export default Page;
