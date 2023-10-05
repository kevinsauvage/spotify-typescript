import Image from 'next/image';
import Link from 'next/link';

import { ArtistInterface } from '@/types';

import styles from './Artist.module.scss';

const Artist: React.FC<{ artist: ArtistInterface }> = ({ artist }) => {
  const { name, images, id } = artist;
  const image = images.at(-1) ?? images.at(1) ?? images.at(0);

  return (
    <li className={styles.artist}>
      <Link href={`/artists/${id}`}>
        <div className={styles.left}>
          {image && (
            <Image
              className={styles.image}
              alt="Album cover"
              src={image?.url}
              width={image?.width}
              height={image?.height}
            />
          )}
          <p className={styles.name}>{name}</p>
        </div>
      </Link>
    </li>
  );
};

export default Artist;
