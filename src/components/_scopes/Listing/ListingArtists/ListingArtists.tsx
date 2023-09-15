import Artist, { ArtistInterface } from '@/components/_cards/Artist/Artist';

import styles from './ListingArtists.module.scss';

const ListingArtists: React.FC<{
  artists: ArtistInterface[];
}> = ({ artists }) => (
  <ul className={styles.list}>
    {Array.isArray(artists) &&
      artists?.map((artist) => <Artist variant="column" key={artist.id} artist={artist} />)}
  </ul>
);

export default ListingArtists;
