import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import { FollowedArtistsInterface } from '@/types';

const SavedArtists: React.FC<{
  followedArtists: FollowedArtistsInterface;
}> = ({ followedArtists }) =>
  Array.isArray(followedArtists?.artists?.items) && (
    <Section title="Your Favorite Artists" href="/artists/favorite">
      <Grid>
        {followedArtists?.artists?.items.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </Grid>
    </Section>
  );

export default SavedArtists;
