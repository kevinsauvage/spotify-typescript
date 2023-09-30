import Image from 'next/image';

import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { getArtist } from '@/lib/Spotify/artist';

import styles from './layout.module.scss';

interface IProperties {
  children: React.ReactNode;
  params: { artistId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const { artistId } = params || {};

  const artist = await getArtist(artistId);
  const { name, popularity, images, href, followers, genres } = artist || {};
  const image = images?.at(0);

  return (
    <div className={styles.layout}>
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
      </Container>

      {children}
    </div>
  );
};

export default layout;
