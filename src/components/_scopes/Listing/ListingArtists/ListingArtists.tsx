import { UserTopArtistInterface } from '@/app/top-artists/page';
import Artist from '@/components/Artist/Artist';

import styles from './ListingArtists.module.scss';

const ListingArtists: React.FC<{
  topArtists: UserTopArtistInterface;
}> = ({ topArtists }) => (
  <ul className={styles.list}>
    {Array.isArray(topArtists?.items) &&
      topArtists?.items?.map((artist) => (
        <Artist variant="column" key={artist.id} artist={artist} />
      ))}
  </ul>
);

export default ListingArtists;
