import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import { NewReleasesAlbums } from '@/types';

const NewAlbums: React.FC<{
  newReleases: NewReleasesAlbums;
}> = ({ newReleases }) => (
  <>
    {Array?.isArray(newReleases?.albums?.items) && (
      <Section title="New Released Albums" href="/albums/new">
        <Grid>
          {newReleases.albums.items.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </Grid>
      </Section>
    )}
  </>
);

export default NewAlbums;
