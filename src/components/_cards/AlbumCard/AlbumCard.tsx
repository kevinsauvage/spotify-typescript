import Image from 'next/image';
import Link from 'next/link';

import Popularity from '@/components/Popularity/Popularity';
import { AlbumInterface } from '@/types';

import styles from './AlbumCard.module.scss';

interface IProperties {
  album: AlbumInterface;
}

const AlbumCard: React.FC<IProperties> = ({ album }) => {
  const { popularity, images, name, id, artists } = album;
  return (
    <div className={styles.AlbumCard}>
      {popularity ? (
        <div className={styles.popularity}>
          <Popularity popularity={popularity} />
        </div>
      ) : (
        ''
      )}
      <Image className={styles.image} src={images[0].url} alt={name} width={300} height={300} />
      <div className={styles.info}>
        <Link className={styles.name} href={`/albums/${id}`}>
          {name}
        </Link>
        <p className={styles.artist}>{artists[0].name}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
