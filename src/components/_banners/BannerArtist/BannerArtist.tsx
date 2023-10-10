import Image from 'next/image';

import Popularity from '@/assets/icons/popularity';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { ArtistInterface } from '@/types';

import ItemDetailSeparator from '../ItemDetailSeparator/ItemDetailSeparator';
import ItemDetailsRow from '../ItemDetailsRow/ItemDetailsRow';

import styles from './BannerArtist.module.scss';

const BannerArtist: React.FC<{
  artist: ArtistInterface;
}> = ({ artist }) => {
  const { name, popularity, images, href, followers, genres } = artist || {};

  const image = images?.at(0);

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
          <h1 className={styles.name}>{name}</h1>
          <ItemDetailsRow>
            <p className={styles.popularity}>
              {popularity} <Popularity />
            </p>
            <ItemDetailSeparator />
            <p className={styles.followers}>{followers?.total}</p>
            <ItemDetailSeparator />
            <p className={styles.genres}>{genres?.join(', ')}</p>
          </ItemDetailsRow>
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
  );
};

export default BannerArtist;
