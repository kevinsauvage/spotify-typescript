import Image from 'next/image';
import Link from 'next/link';

import Calendar from '@/assets/icons/calendar';
import Popularity from '@/assets/icons/popularity';
import Time from '@/assets/icons/time';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { ArtistInterface, TrackInterface } from '@/types';
import { getMinuteFromMilliseconds } from '@/utils/date';

import ItemDetailSeparator from '../ItemDetailSeparator/ItemDetailSeparator';
import ItemDetailsRow from '../ItemDetailsRow/ItemDetailsRow';

import styles from './BannerTrack.module.scss';

const BannerTrack: React.FC<{
  track: TrackInterface;
  artist: ArtistInterface;
}> = ({ track, artist }) => {
  const { name, album, external_urls: externalUrls } = track || {};

  const { images, name: albumName } = album || {};

  const image = images?.at(0);

  const artistImage = artist?.images?.at(2) ?? artist?.images?.at(1) ?? artist?.images?.at(0);

  return (
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
          <ItemDetailsRow>
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
            <ItemDetailSeparator />
            <Link href={`/albums/${album.id}`}>{albumName}</Link>
            <ItemDetailSeparator />
            <p className={styles.year}>
              {album?.release_date.split('-')[0]}
              <Calendar />
            </p>
            <ItemDetailSeparator />
            <p className={styles.duration}>
              {getMinuteFromMilliseconds(track?.duration_ms)} <Time />
            </p>
            <ItemDetailSeparator />
            <p className={styles.popularity}>
              {track?.popularity}
              <Popularity />
            </p>
          </ItemDetailsRow>

          <div className={styles.buttons}>
            <LinkPrimary href={externalUrls.spotify} target="__blank">
              Play on spotify
            </LinkPrimary>
          </div>
        </div>
      </div>
    </PageBannerWrapper>
  );
};

export default BannerTrack;
