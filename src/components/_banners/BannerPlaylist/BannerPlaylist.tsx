import Image from 'next/image';

import Container from '@/components/Container/Container';
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
    id,
    name,
    images,
    description,
    collaborative,
    external_urls,
    followers,
    public: isPublic,
    owner,
  } = playlist || {};

  const image = images?.at(0);

  return (
    <Container>
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
            <p className={styles.description}>{description}</p>
            <ItemDetailsRow>
              <p className={styles.public}>{isPublic ? 'Public' : 'Private'}</p>
              <ItemDetailSeparator />
              {collaborative && <p className={styles.collaborative}>Collaborative</p>}
              {collaborative && <ItemDetailSeparator />}

              <p className={styles.followers}>{followers?.total}</p>
            </ItemDetailsRow>
            <div className={styles.links}>
              <LinkPrimary href={owner.external_urls.spotify} target="__blank">
                See owner profile
              </LinkPrimary>
              <LinkPrimary href={external_urls?.spotify} target="__blank">
                Open in Spotify
              </LinkPrimary>
              <LinkPrimary href={`/playlists/${id}/recommendations`}>
                See Track Recommendations
              </LinkPrimary>
            </div>
          </div>
        </div>
      </PageBannerWrapper>
    </Container>
  );
};

export default BannerPlaylist;
