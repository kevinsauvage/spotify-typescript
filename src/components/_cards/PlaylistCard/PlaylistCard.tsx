import Image from 'next/image';
import Link from 'next/link';

import { PlaylistInterface } from '@/types';

import styles from './PlaylistCard.module.scss';

const PlaylistCard: React.FC<{
  playlist: PlaylistInterface;
}> = ({ playlist }) => {
  const { name, images, id, tracks } = playlist;

  const image = (images?.length && images?.at(1)) || images?.at(0) || images?.pop();

  return (
    <div className={styles.playlist}>
      {image?.url && <Image alt="Album cover" src={image?.url} width={200} height={200} />}
      <div className={styles.content}>
        <Link href={`/playlists/${id}`} className={styles.name}>
          {name}
        </Link>
        <p className={styles.totalTracks}>{tracks?.total} tracks</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
