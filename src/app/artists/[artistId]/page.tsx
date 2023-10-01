import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import TrackTable from '@/components/TrackTable/TrackTable';
import { getArtistAlbums, getArtistRelatedArtists, getArtistTopTracks } from '@/lib/Spotify/artist';
import { AlbumInterface, ArtistAlbumsInterface, ArtistInterface, TrackInterface } from '@/types';

interface PageInterface {
  params: { artistId: string };
  searchParams: object;
}

const Page: React.FC<PageInterface> = async ({ params }) => {
  const { artistId } = params || {};

  const [artistTopTracks, relatedArtists, albums]: [
    { tracks: TrackInterface[] },
    { artists: ArtistInterface[] },
    ArtistAlbumsInterface,
  ] = await Promise.all([
    getArtistTopTracks(artistId),
    getArtistRelatedArtists(artistId),
    getArtistAlbums(artistId),
  ]);

  /*   const recommencedTracks: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 5,
    seedArtists: artistId,
  }); */

  return (
    <Container>
      {artistTopTracks?.tracks?.length > 0 && (
        <Section title={'Top Tracks'}>
          <TrackTable>
            {artistTopTracks.tracks.map((track) => (
              <TrackRow key={track.id} track={track} />
            ))}
          </TrackTable>
        </Section>
      )}

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
            {relatedArtists.artists.slice(0, 10).map((relatedArtist) => (
              <ArtistCard key={relatedArtist.id} artist={relatedArtist} />
            ))}
          </Grid>
        </Section>
      )}

      {/*       {recommencedTracks?.tracks?.length > 0 && (
        <Section title="Recommended Tracks" href={`/artists/${artistId}/recommendations`}>
          <TrackTable>
            {recommencedTracks.tracks.map((track) => (
              <TrackRow key={track.id} track={track} />
            ))}
          </TrackTable>
        </Section>
      )} */}
    </Container>
  );
};

export default Page;
