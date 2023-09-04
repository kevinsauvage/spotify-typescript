import Image from 'next/image';
import Link from 'next/link';

import { ArtistInterface } from '@/components/Artist/Artist';
import TrackList from '@/components/TrackList/TrackList';
import { getArtist, getArtistTopTracks } from '@/lib/Spotify/artist';

import styles from './page.module.scss';

interface PageInterface {
  params: { artistId: string };
  searchParams: object;
}

const Page: React.FC<PageInterface> = async ({ params }) => {
  const artist: ArtistInterface = await getArtist(params.artistId);
  const artistTopTracks = await getArtistTopTracks(params.artistId);

  const { name, popularity, images, id, href, followers, genres } = artist || {};

  const image = images?.at(0);

  return (
    <div className={styles.artist}>
      <div className={styles.banner}>
        {image && (
          <Image
            className={styles.image}
            alt="Album cover"
            src={image?.url}
            width={image?.width}
            height={image?.height}
          />
        )}

        <div>
          <h1 className={styles.name}>{name}</h1>

          <p className={styles.popularity}>Popularity: {popularity}</p>
          <p className={styles.followers}>Followers: {followers?.total}</p>
          <p className={styles.genres}>Genres: {genres?.join(', ')}</p>

          <div className={styles.buttons}>
            {href && (
              <Link href={href} target="__blank">
                See on spotify
              </Link>
            )}
            <Link href={`/recommendations/artists/${id}`}>See Track Recommendations</Link>
          </div>
        </div>
      </div>

      <div className={styles.topTracks}>
        <h2>Top Tracks</h2>
        <TrackList tracks={artistTopTracks?.tracks} />
      </div>
    </div>
  );
};

export default Page;
