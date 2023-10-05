import BannerSearch from '@/components/_banners/BannerSearch/BannerSearch';
import AlbumCard from '@/components/_cards/AlbumCard/AlbumCard';
import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import PlaylistCard from '@/components/_cards/PlaylistCard/PlaylistCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import searchSpotify from '@/lib/Spotify/search';
import { AlbumInterface, ArtistInterface, PlaylistInterface, TrackInterface } from '@/types';

interface IProperties {
  searchParams: { query: string; type: string; page: string };
}

const page: React.FC<IProperties> = async ({ searchParams }) => {
  const { query, type } = searchParams;
  const currentPage = Number.parseInt(searchParams.page) || 1;

  const searchResults: {
    tracks: { items: TrackInterface[]; total: number };
    albums: { items: AlbumInterface[]; total: number };
    artists: { items: ArtistInterface[]; total: number };
    playlists: { items: PlaylistInterface[]; total: number };
  } = await searchSpotify(query, currentPage, type ? 30 : 10, type);

  const { tracks, albums, artists, playlists } = searchResults || {};

  return (
    <>
      <BannerSearch title={`Search Results for ${query}`} />
      <Container>
        {Array?.isArray(tracks?.items) && (
          <Section
            title={`Tracks`}
            buttonText={`See all (${tracks.total})`}
            href={
              tracks.total > tracks.items.length && !type ? `/search?query=${query}&type=track` : ''
            }
          >
            <TrackTable>
              {tracks.items.map((track) => (
                <TrackRow key={track.id} track={track} />
              ))}
            </TrackTable>
          </Section>
        )}
        {Array?.isArray(albums?.items) && (
          <Section
            title="Albums"
            buttonText={`See all (${albums.total})`}
            href={
              albums.total > albums.items.length && !type ? `/search?query=${query}&type=album` : ''
            }
          >
            <Grid>
              {albums.items.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </Grid>
          </Section>
        )}
        {Array?.isArray(artists?.items) && (
          <Section
            title="Artists"
            buttonText={`See all (${artists.total})`}
            href={
              artists.total > artists.items.length && !type
                ? `/search?query=${query}&type=artist`
                : ''
            }
          >
            <Grid>
              {artists.items.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </Grid>
          </Section>
        )}
        {Array?.isArray(playlists?.items) && (
          <Section
            title="Playlists"
            buttonText={`See all (${playlists.total})`}
            href={
              playlists.total > playlists.items.length && !type
                ? `/search?query=${query}&type=playlist`
                : ''
            }
          >
            <Grid>
              {playlists.items.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </Grid>
          </Section>
        )}

        {type && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              (tracks?.total || albums?.total || playlists?.total || artists?.total) / 30,
            )}
            navigate
          />
        )}
      </Container>
    </>
  );
};

export default page;
