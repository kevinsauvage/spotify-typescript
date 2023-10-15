import PlaylistCard from '@/components/_cards/PlaylistCard/PlaylistCard';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import { UserPlaylistInterface } from '@/types';

const SavedPlaylists: React.FC<{
  followedPlaylists: UserPlaylistInterface;
}> = ({ followedPlaylists }) =>
  Array?.isArray(followedPlaylists?.items) && (
    <Section title="Saved Playlists" href="/playlists/saved">
      <Grid>
        {followedPlaylists.items.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </Grid>
    </Section>
  );

export default SavedPlaylists;
