import Image from 'next/image';
import Link from 'next/link';

import Popularity from '@/assets/icons/popularity';
import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { AlbumInterface } from '@/types';

import ItemDetailSeparator from '../ItemDetailSeparator/ItemDetailSeparator';
import ItemDetailsRow from '../ItemDetailsRow/ItemDetailsRow';

import styles from './BannerAlbum.module.scss';

const BannerAlbum: React.FC<{
  album: AlbumInterface;
}> = ({ album }) => {
  const {
    name,
    popularity,
    images,
    external_urls,
    genres,
    release_date,
    album_type,
    total_tracks,
    artists,
  } = album || {};

  const image = images?.at(0);
  const artist = artists?.at(0);

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
            <ItemDetailsRow>
              {artist && (
                <Link href={`/artists/${artist.id}`} className={styles.artist}>
                  <p>{artist.name}</p>
                </Link>
              )}
              <ItemDetailSeparator />
              <p className={styles.popularity}>
                {popularity}
                <Popularity />
              </p>
              <ItemDetailSeparator />
              {genres?.length > 0 && <p className={styles.genres}>{genres?.join(', ')}</p>}
              {genres?.length > 0 && <ItemDetailSeparator />}

              <p className={styles.release}>{release_date?.split('-')[0]}</p>
              <ItemDetailSeparator />
              <p className={styles.type}>{album_type}</p>
              <ItemDetailSeparator />
              <p className={styles.totalTracks}>{total_tracks} tracks</p>
            </ItemDetailsRow>
            <div className={styles.buttons}>
              {external_urls?.spotify && (
                <LinkPrimary href={external_urls?.spotify} target="__blank">
                  See on spotify
                </LinkPrimary>
              )}
            </div>
          </div>
        </div>
      </PageBannerWrapper>
    </Container>
  );
};

export default BannerAlbum;
