import Playlist, { PlaylistInterface } from '@/components/_cards/Playlist/Playlist';
import ListingBanner from '@/components/_scopes/Listing/ListingBanner/ListingBanner';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import { getEndpointMePlaylists } from '@/lib/Spotify/user';

import styles from './page.module.scss';

export interface UserPlaylistInterface {
  items: [PlaylistInterface];
  limit: number;
  offset: number;
  total: number;
}
interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const page = Number(searchParams.page || 1);

  const followedPlaylists: UserPlaylistInterface = await getEndpointMePlaylists(page);

  return (
    <div>
      <ListingBanner title="Followed Playlists" />
      <ul className={styles.list}>
        {Array.isArray(followedPlaylists?.items) &&
          followedPlaylists?.items?.map((playlist) => (
            <Playlist key={playlist.id} playlist={playlist} />
          ))}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={Math.floor(followedPlaylists?.total / followedPlaylists?.limit)}
        navigate
      />
    </div>
  );
};

export default Page;
