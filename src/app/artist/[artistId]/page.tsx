import Image from 'next/image';

import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import List from '@/components/List/List';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Section from '@/components/Section/Section';
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

  const [artist, artistTopTracks, relatedArtists]: [
    ArtistInterface,
    { tracks: TrackInterface[] },
    { artists: ArtistInterface[] },
  ] = await Promise.all([
    getArtist(artistId),
    getArtistTopTracks(artistId),
    getArtistRelatedArtists(artistId),
  ]);

  const recommencedTracks: { tracks: TrackInterface[] } = await getRecommendations({
    limit: 5,
    seedArtists: artistId,
  });
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
            </div>
          </div>
        </div>
      </PageBannerWrapper>

      <Container>
        <div className={styles.topTracks}>
          {artistTopTracks?.tracks?.length > 0 && (
            <Section title={'Top Tracks'}>
              <List>
                {artistTopTracks.tracks.map((track) => (
                  <TrackRow key={track.id} track={track} />
                ))}
              </List>
            </Section>
          )}

          {relatedArtists?.artists?.length > 0 && (
            <Section title="Related Artists">
              <Grid>
                {relatedArtists.artists.slice(0, 10).map((relatedArtist) => (
                  <ArtistCard key={relatedArtist.id} artist={relatedArtist} />
                ))}
              </Grid>
            </Section>
          )}

          {recommencedTracks?.tracks?.length > 0 && (
            <Section title="Recommended Tracks" href={`/recommendations/artists/${id}`}>
              <List>
                {recommencedTracks.tracks.map((track) => (
                  <TrackRow key={track.id} track={track} />
                ))}
              </List>
            </Section>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Page;
