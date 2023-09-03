import ListingBanner from '@/components/ListingBanner/ListingBanner';
import Playlist, { PlaylistInterface } from '@/components/Playlist/Playlist';
import { getEndpointMePlaylists } from '@/lib/Spotify';

import styles from './page.module.scss';

export interface UserPlaylistInterface {
  items: [PlaylistInterface];
}

const page: React.FC = async () => {
  const followedPlaylists: UserPlaylistInterface = await getEndpointMePlaylists();

  return (
    <div>
      <ListingBanner title="Followed Playlists" />
      <ul className={styles.list}>
        {Array.isArray(followedPlaylists?.items) &&
          followedPlaylists?.items?.map((playlist) => (
            <Playlist key={playlist.id} playlist={playlist} />
          ))}
      </ul>
    </div>
  );
};

export default page;
