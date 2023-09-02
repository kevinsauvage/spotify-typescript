import Playlist, { PlaylistInterface } from '@/components/Playlist/Playlist';
import { getEndpointMePlaylists } from '@/lib/Spotify';

import styles from './page.module.scss';

export interface UserPlaylistInterface {
  items: [PlaylistInterface];
}

const page: React.FC = async () => {
  const followedPlaylists: UserPlaylistInterface = await getEndpointMePlaylists();

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <h1>Followed Playlists</h1>
      </div>
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
