import BannerArtist from '@/components/_banners/BannerArtist/BannerArtist';
import { getArtist } from '@/lib/Spotify/artist';

import styles from './layout.module.scss';
interface IProperties {
  children: React.ReactNode;
  params: { artistId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const artist = await getArtist(params.artistId);

  return (
    <div className={styles.layout}>
      <BannerArtist artist={artist} />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default layout;
