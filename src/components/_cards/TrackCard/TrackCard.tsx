import Image from 'next/image';
import Link from 'next/link';

import TrackConfig from '@/components/TrackConfig/TrackConfig';
import { removeFromPlaylist } from '@/lib/Spotify/playlist';
import { TrackInterface } from '@/types';
import { getMinuteFromMilliseconds } from '@/utils/date';

import styles from './TrackCard.module.scss';

const TrackCard: React.FC<{
  track: TrackInterface;
  playlistId?: string;
}> = ({ track, playlistId }) => {
  const { name, artists, album, duration_ms: durationMs, id, uri } = track || {};
  const { images } = album || {};
  const image = images?.at(1) ?? images?.at(0);

  return (
    <div className={styles.track}>
      {image && (
        <Image alt="Album cover" src={image?.url} width={image?.width} height={image?.height} />
      )}
      <div className={styles.content}>
        <Link className={styles.name} href={`/track/${id}`}>
          {name}
        </Link>
        <div className={styles.info}>
          <Link href={`/artist/${artists?.[0]?.id}`}>
            <p className={styles.artist}>{artists?.[0]?.name}</p>
          </Link>
          <span>-</span>
          <p className={styles.album}>{album?.name}</p>
        </div>
      </div>
      <p className={styles.duration}>{getMinuteFromMilliseconds(durationMs)}</p>
      {playlistId && (
        <TrackConfig playlistId={playlistId} uri={uri} removeFromPlaylist={removeFromPlaylist} />
      )}
    </div>
  );
};

export default TrackCard;
