import Image from 'next/image';

import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { AlbumInterface } from '@/types';

import styles from './BannerAlbum.module.scss';

const BannerAlbum: React.FC<{
  album: AlbumInterface;
}> = ({ album }) => {
  const { name, popularity, images, external_urls, genres } = album || {};
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
            <p className={styles.popularity}>Popularity: {popularity}</p>
            <p className={styles.genres}>Genres: {genres?.join(', ')}</p>
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
