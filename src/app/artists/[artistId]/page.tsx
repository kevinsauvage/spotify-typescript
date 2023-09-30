import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import List from '@/components/List/List';
import Section from '@/components/Section/Section';
import { getArtistRelatedArtists, getArtistTopTracks } from '@/lib/Spotify/artist';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { ArtistInterface, TrackInterface } from '@/types';

interface PageInterface {
  params: { artistId: string };
  searchParams: object;
}

const Page: React.FC<PageInterface> = async ({ params }) => {
  const { artistId } = params || {};

  const [artistTopTracks, relatedArtists]: [
    { tracks: TrackInterface[] },
    { artists: ArtistInterface[] },
  ] = await Promise.all([getArtistTopTracks(artistId), getArtistRelatedArtists(artistId)]);

  const recommencedTracks: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 5,
    seedArtists: artistId,
  });

  return (
    <Container>
      {artistTopTracks?.tracks?.length > 0 && (
        <Section title={'Top Tracks'}>
          <List>
            {artistTopTracks.tracks.map((track) => (
              <TrackRow key={track.id} track={track} />
            ))}
          </List>
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

      {recommencedTracks?.tracks?.length > 0 && (
        <Section title="Recommended Tracks" href={`/artists/${artistId}/recommendations`}>
          <List>
            {recommencedTracks.tracks.map((track) => (
              <TrackRow key={track.id} track={track} />
            ))}
          </List>
        </Section>
      )}
    </Container>
  );
};

export default Page;
