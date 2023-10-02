import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { TrackInterface } from '@/types';

import styles from './BannerTrack.module.scss';

const BannerTrack: React.FC<{
  track: TrackInterface;
}> = ({ track }) => {
  const { name, artists, album, external_urls: externalUrls } = track || {};
  const { images } = album || {};
  const image = images?.at(0);

  return (
    <Container>
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
            <div className={styles.artists}>
              <strong>Artists: </strong>
              {artists.map((artist, index) => (
                <>
                  <Link href={`/artists/${artist.id}`} key={artist.id}>
                    {artist.name}
                  </Link>
                  {index < artists.length - 1 && <span>, </span>}
                </>
              ))}
            </div>
            <div>
              <p className={styles.albumName}>
                <strong>Album: </strong>
                {album.name}
              </p>
            </div>
            <div className={styles.buttons}>
              <LinkPrimary href={externalUrls.spotify} target="__blank">
                Play on spotify
              </LinkPrimary>
            </div>
          </div>
        </div>
      </PageBannerWrapper>
    </Container>
  );
};

export default BannerTrack;
