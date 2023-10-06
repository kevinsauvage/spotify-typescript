import BannerTrack from '@/components/_banners/BannerTrack/BannerTrack';
import { getArtist } from '@/lib/Spotify/artist';
import { getTrack } from '@/lib/Spotify/track';
import { ArtistInterface, TrackInterface } from '@/types';

import styles from './layout.module.scss';

interface IProperties {
  children: React.ReactNode;
  params: { trackId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const track: TrackInterface = await getTrack(params?.trackId);
  const artist: ArtistInterface = await getArtist(track?.artists?.[0]?.id);

  return (
    <div className={styles.layout}>
      <BannerTrack track={track} artist={artist} />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default layout;
