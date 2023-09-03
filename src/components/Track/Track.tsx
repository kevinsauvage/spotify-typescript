import Image from 'next/image';
import Link from 'next/link';

import { ArtistInterface } from '@/components/Artist/Artist';
import { getMinuteFromMilliseconds } from '@/utils/date';

import styles from './Track.module.scss';

export interface TrackInterface {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  artists: [ArtistInterface];
  external_urls: { spotify: string };
  album: { name: string; images: [{ height: number; url: string; width: number }] };
}

const Track: React.FC<{
  track: TrackInterface;
}> = ({ track }) => {
  const { name, artists, album, duration_ms: durationMs, id } = track || {};
  const { images } = album || {};
  const image = images?.pop();

  return (
    <li className={styles.track}>
      {image && (
        <Image alt="Album cover" src={image?.url} width={image?.width} height={image?.height} />
      )}
      <div className={styles.left}>
        <Link className={styles.name} href={`/track/${id}`}>
          {name}
        </Link>
        <div className={styles.info}>
          <p className={styles.artist}>{artists?.[0]?.name}</p>
          <span>-</span>
          <p className={styles.album}>{album?.name}</p>
        </div>
      </div>
      <p className={styles.duration}>{getMinuteFromMilliseconds(durationMs)}</p>
    </li>
  );
};

export default Track;
