import Image from 'next/image';
import Link from 'next/link';

import Calendar from '@/assets/icons/calendar';
import { AlbumInterface } from '@/types';

import styles from './AlbumRow.module.scss';

interface IProperties {
  album: AlbumInterface;
}

const AlbumRow: React.FC<IProperties> = ({ album }) => {
  const { popularity, images, name, id, artists, total_tracks, release_date } = album;

  return (
    <tr className={styles.AlbumRow}>
      <td className={styles.image}>
        <Image src={images[0].url} alt={name} width={300} height={300} />
      </td>

      <td className={styles.name}>
        <Link href={`/albums/${id}`}>{name}</Link>
      </td>

      <td className={styles.artist}>
        {artists.map((artist, index) => (
          <Link key={artist.id} href={`/artists/${artist.id}`}>
            {artist.name}
            {index < artists.length - 1 && ', '}
          </Link>
        ))}
      </td>

      <td>
        <div className={styles.year}>
          {release_date.split('-')[0]}
          <Calendar />
        </div>
      </td>

      {popularity && <td className={styles.popularity}>{popularity}</td>}

      <td className={styles.total}>{total_tracks}</td>
    </tr>
  );
};

export default AlbumRow;
