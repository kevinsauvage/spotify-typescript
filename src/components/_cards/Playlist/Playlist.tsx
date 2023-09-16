import Image from 'next/image';
import Link from 'next/link';

import { TrackInterface } from '../Track/Track';

import styles from './Playlist.module.scss';

export interface PlaylistInterface {
  id: string;
  images: [{ height: number; url: string; width: number }];
  name: string;
  tracks: [TrackInterface];
}

const Playlist: React.FC<{
  playlist: PlaylistInterface;
}> = ({ playlist }) => {
  const { name, images, id } = playlist;

  const image = (images?.length && images?.at(1)) || images?.at(0) || images?.pop();

  return (
    <li className={styles.playlist}>
      {image?.url && <Image alt="Album cover" src={image?.url} width={200} height={200} />}
      <div className={styles.left}>
        <Link href={`/playlists/${id}`} className={styles.name}>
          {name}
        </Link>
      </div>
    </li>
  );
};

export default Playlist;
