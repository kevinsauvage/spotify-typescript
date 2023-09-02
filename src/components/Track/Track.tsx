import Image from 'next/image';

import { ArtistInterface } from '@/components/Artist/Artist';
import { getMinuteFromMilliseconds } from '@/utils/date';

import styles from './Track.module.scss';

export interface TrackInterface {
  id: string;
  name: string;
  duration_ms: number;
  artists: [ArtistInterface];
  album: { name: string; images: [{ height: number; url: string; width: number }] };
}

const Track: React.FC<{
  track: TrackInterface;
}> = ({ track }) => {
  const { name, artists, album, duration_ms: durationMs } = track || {};
  const { images } = album || {};
  const image = images?.pop();

  return (
    <div className={styles.track}>
      {image && (
        <Image alt="Album cover" src={image?.url} width={image?.width} height={image?.height} />
      )}
      <div className={styles.left}>
        <p className={styles.name}>{name}</p>
        <div className={styles.info}>
          <p className={styles.artist}>{artists?.[0]?.name}</p>
          <span>-</span>
          <p className={styles.album}>{album?.name}</p>
        </div>
      </div>
      <p className={styles.duration}>{getMinuteFromMilliseconds(durationMs)}</p>
    </div>
  );
};

export default Track;
