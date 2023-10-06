import Image from 'next/image';
import Link from 'next/link';

import PopularityIcon from '@/assets/icons/popularity';
import Time from '@/assets/icons/time';
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
  const image = images?.at(2) ?? images?.at(1) ?? images?.at(0);

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
          {album?.id && (
            <>
              <span>-</span>
              <Link href={`/albums/${album?.id}`} className={styles.album}>
                {album?.name}
              </Link>
            </>
          )}
        </div>
      </td>
      {typeof popularity === 'number' ? (
        <td>
          <div className={styles.popularity}>
            {popularity}
            <PopularityIcon />
          </div>
        </td>
      ) : (
        ''
      )}
      <td>
        <div className={styles.duration}>
          {getMinuteFromMilliseconds(durationMs)} <Time />
        </div>
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
