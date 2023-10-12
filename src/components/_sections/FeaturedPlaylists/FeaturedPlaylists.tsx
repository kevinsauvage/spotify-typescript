import PlaylistCard from '@/components/_cards/PlaylistCard/PlaylistCard';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import { FeaturedPlaylistInterface } from '@/types';

const FeaturedPlaylists: React.FC<{
  featuredPlaylists: FeaturedPlaylistInterface;
}> = ({ featuredPlaylists }) =>
  Array?.isArray(featuredPlaylists?.playlists?.items) && (
    <Section title="Featured Playlists">
      <Grid>
        {featuredPlaylists.playlists.items.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </Grid>
    </Section>
  );

export default FeaturedPlaylists;
