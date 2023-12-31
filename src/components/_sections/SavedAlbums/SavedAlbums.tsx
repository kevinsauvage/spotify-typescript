import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import { SavedAlbumResponseInterface } from '@/types';

const SavedAlbums: React.FC<{
  savedAlbums: SavedAlbumResponseInterface;
}> = ({ savedAlbums }) =>
  Array.isArray(savedAlbums?.items) && (
    <Section title="Saved Albums" href="/albums/saved">
      <Grid>
        {savedAlbums.items.map((album) => (
          <AlbumCard key={album.album.id} album={album.album} />
        ))}
      </Grid>
    </Section>
  );

export default SavedAlbums;
