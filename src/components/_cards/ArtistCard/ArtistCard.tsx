import Image from 'next/image';
import Link from 'next/link';

import { ArtistInterface } from '@/types';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './ArtistCard.module.scss';

const ArtistCard: React.FC<{
  artist: ArtistInterface;
}> = ({ artist }) => {
  const { name, images, id } = artist;
  const image = images.at(2) ?? images.at(1) ?? images.at(0);

  return (
    <div className={styles.artist}>
      <div className={styles.inner}>
        {image && (
          <Image
            className={styles.image}
            alt="Album cover"
            src={image?.url}
            width={image?.width}
            height={image?.height}
          />
        )}
        <Link href={`/artist/${id}`} className={styles.name}>
          {name}
        </Link>
      </div>
    </div>
  );
};

export default ArtistCard;
