import Image from 'next/image';
import Link from 'next/link';

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
    <tr className={styles.track}>
      {image && (
        <td>
          <Image alt="Album cover" src={image?.url} width={50} height={50} />
        </td>
      )}
      <td className={styles.left}>
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
      </td>
      {popularity && <td>{popularity}</td>}
      <td className={styles.right}>
        <p className={styles.duration}>{getMinuteFromMilliseconds(durationMs)}</p>
      </td>
      {playlistId && (
        <td>
          <TrackConfig playlistId={playlistId} uri={uri} removeFromPlaylist={removeFromPlaylist} />
        </td>
      )}
    </tr>
  );
};

export default TrackRow;
