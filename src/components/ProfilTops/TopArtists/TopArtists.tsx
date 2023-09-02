import LinkButton from '@/components/LinkButton/LinkButton';

import Artist, { ArtistInterface } from '../../Artist/Artist';

import styles from './TopArtists.module.scss';

export interface UserTopArtistInterface {
  items: [ArtistInterface];
}
export const TopArtists: React.FC<{
  userTopArtists: UserTopArtistInterface;
}> = ({ userTopArtists }) => (
  <section className={styles.section}>
    <header>
      <b>Top artists of all time</b>
      <LinkButton href="/top-artists">View More</LinkButton>
    </header>
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
