import BannerPlaylist from '@/components/_banners/BannerPlaylist/BannerPlaylist';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Wrapper from '@/components/Wrapper/Wrapper';
import { getEnpointPlaylist, getPlaylistTracks } from '@/lib/Spotify/playlist';
import { getEndpointMe } from '@/lib/Spotify/user';
import { PlaylistResponseInterface, PlaylistTracksInterface, UserDataInterface } from '@/types';

interface PageInterface {
  params: { playlistId: string };
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const page = Number(searchParams.page || 1);

  const [playlist, playlistTracks, user]: [
    PlaylistResponseInterface,
    PlaylistTracksInterface,
    UserDataInterface,
  ] = await Promise.all([
    getEnpointPlaylist(params.playlistId),
    getPlaylistTracks(params.playlistId, page),
    getEndpointMe(),
  ]);

  return (
    <Container>
      <Breadcrumbs
        config={{ 1: { href: `/playlists/${params.playlistId}`, name: playlist.name } }}
      />
      <BannerPlaylist playlist={playlist} />
      <Wrapper>
        <Section title="Playlist tracks">
          <TrackTable remove={playlist.owner.id === user.id}>
            {playlistTracks?.items?.map((track) => (
              <TrackRow
                key={track.track.id}
                track={track.track}
                playlistId={params.playlistId}
                showDelete={playlist.owner.id === user.id}
              />
            ))}
          </TrackTable>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(playlistTracks?.total / playlistTracks?.limit)}
            navigate
          />
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Page;
