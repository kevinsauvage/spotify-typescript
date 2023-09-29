import Image from 'next/image';
import Link from 'next/link';

import styles from './Artist.module.scss';

export interface ArtistInterface {
  id: string;
  name: string;
  popularity: number;
  images: [{ url: string; width: number; height: number }];
  href: string;
  followers: {
    href: 'string';
    total: 0;
  };
  genres: string[];
}

const Artist: React.FC<{
  artist: ArtistInterface;
}> = ({ artist }) => {
  const { name, images, id } = artist;
  const image = images.at(-1) ?? images.at(1) ?? images.at(0);

  return (
    <li className={styles.artist}>
      <Link href={`/artist/${id}`}>
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
