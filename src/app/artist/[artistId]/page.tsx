import Image from 'next/image';

import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import CardsPresenter from '@/components/CardsPresenter/CardsPresenter';
import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import RowsPresenter from '@/components/RowsPresenter/RowsPresenter';
import { getArtist, getArtistRelatedArtists, getArtistTopTracks } from '@/lib/Spotify/artist';
import { getRecommendations } from '@/lib/Spotify/recommendations';
import { ArtistInterface, TrackInterface } from '@/types';

import styles from './page.module.scss';

interface PageInterface {
  params: { artistId: string };
  searchParams: object;
}

const Page: React.FC<PageInterface> = async ({ params }) => {
  const { artistId } = params || {};

  const [artist, artistTopTracks, relatedArtists, recommencedTracks]: [
    ArtistInterface,
    { tracks: TrackInterface[] },
    { artists: ArtistInterface[] },
    { tracks: TrackInterface[] },
  ] = await Promise.all([
    getArtist(artistId),
    getArtistTopTracks(artistId),
    getArtistRelatedArtists(artistId),
    getRecommendations({ limit: 10, seedArtists: artistId }),
  ]);

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
          <RowsPresenter title={'Top Tracks'}>
            {artistTopTracks?.tracks?.map((track) => <TrackRow key={track.id} track={track} />)}
          </RowsPresenter>

          <CardsPresenter title="Related Artists">
            {relatedArtists?.artists
              ?.slice(0, 10)
              .map((relatedArtist) => <ArtistCard key={relatedArtist.id} artist={relatedArtist} />)}
          </CardsPresenter>

          <RowsPresenter title="Recommended Tracks">
            {recommencedTracks?.tracks?.map((track) => <TrackRow key={track.id} track={track} />)}
          </RowsPresenter>
        </div>
      </Container>
    </div>
  );
};

export default Page;
