import Image from 'next/image';

import { ArtistInterface } from '@/components/_cards/Artist/Artist';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';
import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
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
      <PageBannerWrapper>
        <div className={styles.banner}>
          {image && (
            <Image
              className={styles.image}
              alt="Album cover"
              src={image?.url}
              width={image?.width}
              height={image?.height}
              priority
            />
          )}

          <div>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.popularity}>Popularity: {popularity}</p>
            <p className={styles.followers}>Followers: {followers?.total}</p>
            <p className={styles.genres}>Genres: {genres?.join(', ')}</p>
            <div className={styles.buttons}>
              {href && (
                <LinkPrimary href={href} target="__blank">
                  See on spotify
                </LinkPrimary>
              )}

              <LinkPrimary href={`/recommendations/artists/${id}`}>
                See Track Recommendations
              </LinkPrimary>
            </div>
          </div>
        </div>
      </PageBannerWrapper>

      <Container>
        <div className={styles.topTracks}>
          <h2>Top Tracks</h2>
          <TrackList tracks={artistTopTracks?.tracks} />
        </div>
      </Container>
    </div>
  );
};

export default Page;
