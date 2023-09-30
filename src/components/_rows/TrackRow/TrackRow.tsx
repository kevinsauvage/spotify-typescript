import Image from 'next/image';
import Link from 'next/link';

import Popularity from '@/components/Popularity/Popularity';
import TrackConfig from '@/components/TrackConfig/TrackConfig';
import { removeFromPlaylist } from '@/lib/Spotify/playlist';
import { TrackInterface } from '@/types';
import { getMinuteFromMilliseconds } from '@/utils/date';

import styles from './TrackRow.module.scss';

const TrackRow: React.FC<{
  track: TrackInterface;
  playlistId?: string;
}> = ({ track, playlistId }) => {
  const { name, artists, album, duration_ms: durationMs, id, uri, popularity } = track || {};
  const { images } = album || {};
  const image = images?.pop();

  return (
    <li className={styles.track}>
      {image && <Image alt="Album cover" src={image?.url} width={50} height={50} />}
      <div className={styles.left}>
        <Link className={styles.name} href={`/tracks/${id}`}>
          {name}
        </Link>
        <div className={styles.info}>
          <Link href={`/artists/${artists?.[0]?.id}`}>
            <p className={styles.artist}>{artists?.[0]?.name}</p>
          </Link>
          <span>-</span>
          <p className={styles.album}>{album?.name}</p>
        </div>
      </div>
      <div>
        {popularity ? <Popularity popularity={popularity} extratyles={styles.popularity} /> : ''}
      </div>
      <div className={styles.right}>
        <p className={styles.duration}>{getMinuteFromMilliseconds(durationMs)}</p>
        {playlistId && (
          <TrackConfig playlistId={playlistId} uri={uri} removeFromPlaylist={removeFromPlaylist} />
        )}
      </div>
    </li>
  );
};

export default TrackRow;
