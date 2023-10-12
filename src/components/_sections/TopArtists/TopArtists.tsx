import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import { UserTopArtistInterface } from '@/types';

const TopArtists: React.FC<{
  userTopArtists: UserTopArtistInterface;
}> = ({ userTopArtists }) => (
  <>
    {Array?.isArray(userTopArtists?.items) && (
      <Section title="Your Top Artists" href="/artists/top">
        <Grid>
          {userTopArtists?.items.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
        </Grid>
      </Section>
    )}
  </>
);

export default TopArtists;
