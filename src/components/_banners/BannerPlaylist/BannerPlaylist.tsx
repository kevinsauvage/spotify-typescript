import Image from 'next/image';

import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { PlaylistResponseInterface } from '@/types';

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
            <Image alt="Album cover" src={image.url} width={300} height={300} priority />
          )}
          <div className={styles.details}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.description}>{description}</p>
            <p className={styles.public}>Public: {String(isPublic)}</p>
            <p className={styles.collaborative}>Collaborative: {String(collaborative)}</p>
            <p className={styles.followers}>Followers: {followers?.total}</p>
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
