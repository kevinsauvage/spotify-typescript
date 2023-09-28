import Image from 'next/image';
import Link from 'next/link';

import { ArtistInterface } from '@/components/_cards/Artist/Artist';
import TrackConfig from '@/components/TrackConfig/TrackConfig';
import { removeFromPlaylist } from '@/lib/Spotify/playlist';
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
  uri: string;
}

const Track: React.FC<{
  track: TrackInterface;
  playlistId?: string;
}> = ({ track, playlistId }) => {
  const { name, artists, album, duration_ms: durationMs, id, uri } = track || {};
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
          <Link href={`/artist/${artists?.[0]?.id}`}>
            <p className={styles.artist}>{artists?.[0]?.name}</p>
          </Link>
          <span>-</span>
          <p className={styles.album}>{album?.name}</p>
        </div>
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

export default Track;
