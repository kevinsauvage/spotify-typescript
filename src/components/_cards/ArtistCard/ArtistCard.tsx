import Image from 'next/image';
import Link from 'next/link';

import Popularity from '@/components/Popularity/Popularity';
import { ArtistInterface } from '@/types';

import styles from './ArtistCard.module.scss';

const ArtistCard: React.FC<{
  artist: ArtistInterface;
}> = ({ artist }) => {
  const { name, images, id, popularity, followers } = artist;

  const image = images.at(2) ?? images.at(1) ?? images.at(0);

  return (
    <div className={styles.artist}>
      <div className={styles.inner}>
        <div className={styles.image}>
          {image ? (
            <Image alt="Album cover" src={image?.url} width={image?.width} height={image?.height} />
          ) : (
            <p>Image not available</p>
          )}
        </div>
        <Link href={`/artists/${id}`} className={styles.name}>
          {name}
        </Link>
        {Number.isNaN(popularity) ? '' : <Popularity popularity={popularity} />}
        {followers?.total ? (
          <div className={styles.followers}>{followers.total} followers</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ArtistCard;
