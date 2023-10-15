import Image from 'next/image';

import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { PlaylistResponseInterface } from '@/types';

import ItemDetailSeparator from '../ItemDetailSeparator/ItemDetailSeparator';
import ItemDetailsRow from '../ItemDetailsRow/ItemDetailsRow';

import styles from './BannerPlaylist.module.scss';

const BannerPlaylist: React.FC<{
  playlist: PlaylistResponseInterface;
}> = ({ playlist }) => {
  const {
    name,
    images,
    description,
    collaborative,
    external_urls,
    followers,
    public: isPublic,
    tracks,
  } = playlist || {};

  const image = images?.at(0);

  return (
    <PageBannerWrapper>
      <div className={styles.banner}>
        {image?.url && (
          <Image
            alt="Album cover"
            src={image.url}
            width={300}
            height={300}
            priority
            className={styles.image}
          />
        )}
        <div>
          <h1 className={styles.name}>{name}</h1>
          {description && (
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
          )}
          <ItemDetailsRow>
            <p className={styles.public}>{isPublic ? 'Public' : 'Private'}</p>
            <ItemDetailSeparator />
            {collaborative && <p className={styles.collaborative}>Collaborative</p>}
            {collaborative && <ItemDetailSeparator />}
            <p className={styles.followers}>{followers?.total} followers</p>
            <ItemDetailSeparator />
            <p className={styles.tracks}>{tracks?.total} tracks</p>
          </ItemDetailsRow>
          <div className={styles.links}>
            <LinkPrimary href={external_urls?.spotify} target="__blank">
              Open in Spotify
            </LinkPrimary>
          </div>
        </div>
      </div>
    </PageBannerWrapper>
  );
};

export default BannerPlaylist;
