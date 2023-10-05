import Image from 'next/image';
import Link from 'next/link';

import Calendar from '@/assets/icons/calendar';
import Popularity from '@/assets/icons/popularity';
import Time from '@/assets/icons/time';
import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { ArtistInterface, TrackInterface } from '@/types';
import { getMinuteFromMilliseconds } from '@/utils/date';

import styles from './BannerTrack.module.scss';

import { get } from 'node:http';

const BannerTrack: React.FC<{
  track: TrackInterface;
  artist: ArtistInterface;
}> = ({ track, artist }) => {
  const { name, album, external_urls: externalUrls } = track || {};
  const { images, name: albumName } = album || {};

  const image = images?.at(0);

  const artistImage = artist?.images?.at(2) ?? artist?.images?.at(1) ?? artist?.images?.at(0);

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
            <p className={styles.titleLabel}>Title</p>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.detail}>
              {artist && (
                <Link href={`/artists/${artist.id}`} className={styles.artist}>
                  {artistImage?.url && (
                    <Image
                      className={styles.image}
                      alt="Album cover"
                      src={artistImage?.url}
                      width={40}
                      height={40}
                      priority
                    />
                  )}

                  <p>{artist.name}</p>
                </Link>
              )}
              <span className={styles.separator} />
              <Link href={`/albums/${album.id}`}>{albumName}</Link>
              <span className={styles.separator} />
              <p className={styles.year}>
                {album?.release_date.split('-')[0]}
                <Calendar />
              </p>
              <span className={styles.separator} />
              <p className={styles.duration}>
                {getMinuteFromMilliseconds(track?.duration_ms)} <Time />
              </p>
              <span className={styles.separator} />
              <p className={styles.popularity}>
                {track?.popularity}
                <Popularity />
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
