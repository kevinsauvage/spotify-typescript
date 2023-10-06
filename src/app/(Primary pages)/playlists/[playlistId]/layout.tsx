import BannerPlaylist from '@/components/_banners/BannerPlaylist/BannerPlaylist';
import { getEnpointPlaylist } from '@/lib/Spotify/playlist';
import { PlaylistResponseInterface } from '@/types';

import styles from './layout.module.scss';
interface IProperties {
  children: React.ReactNode;
  params: { playlistId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const playlist: PlaylistResponseInterface = await getEnpointPlaylist(params.playlistId);

  return (
    <div className={styles.layout}>
      <BannerPlaylist playlist={playlist} />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default layout;
