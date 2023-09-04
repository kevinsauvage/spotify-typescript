import Artist, { ArtistInterface } from '../../Artist/Artist';
import ProfilTopsHeader from '../ProfilTopsHeader/ProfilTopsHeader';

import styles from './TopArtists.module.scss';

export interface UserTopArtistInterface {
  items: [ArtistInterface];
}
export const TopArtists: React.FC<{
  userTopArtists: UserTopArtistInterface;
}> = ({ userTopArtists }) => (
  <section className={styles.section}>
    <ProfilTopsHeader title="Top artists of all time" href="/top-artists" />
    {userTopArtists?.items?.length > 0 ? (
      <ul>
        {userTopArtists?.items?.map((artist: ArtistInterface) => (
          <Artist variant="row" key={artist.id} artist={artist} />
        ))}
      </ul>
    ) : (
      <div>No artists found</div>
    )}
  </section>
);
