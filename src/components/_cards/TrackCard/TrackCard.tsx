import Image from 'next/image';
import Link from 'next/link';

import Popularity from '@/components/Popularity/Popularity';
import { TrackInterface } from '@/types';
import { getMinuteFromMilliseconds } from '@/utils/date';

import styles from './TrackCard.module.scss';

const TrackCard: React.FC<{
  track: TrackInterface;
}> = ({ track }) => {
  const { name, artists, album, duration_ms: durationMs, id, popularity } = track || {};
  const { images } = album || {};
  const image = images?.at(1) ?? images?.at(0);

  return (
    <div className={styles.track}>
      {image && (
        <Image alt="Album cover" src={image?.url} width={image?.width} height={image?.height} />
      )}
      <div className={styles.content}>
        <Link className={styles.name} href={`/tracks/${id}`}>
          {name}
        </Link>
        <div className={styles.info}>
          <Link href={`/artists/${artists?.[0]?.id}`}>
            <p className={styles.artist}>{artists?.[0]?.name}</p>
          </Link>
          <span>-</span>
          <Link href={`/albums/${album?.id}`} className={styles.album}>
            {album?.name}
          </Link>
        </div>
        <p className={styles.duration}>{getMinuteFromMilliseconds(durationMs)}</p>
      </div>
      {popularity ? <Popularity popularity={popularity} /> : ''}
    </div>
  );
};

export default TrackCard;
