import BannerAlbum from '@/components/_banners/BannerAlbum/BannerAlbum';
import { getAlbumById } from '@/lib/Spotify/album';

import styles from './layout.module.scss';

interface IProperties {
  children: React.ReactNode;
  params: { albumId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const { albumId } = params || {};
  const album = await getAlbumById(albumId);

  return (
    <div className={styles.layout}>
      <BannerAlbum album={album} />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default layout;
