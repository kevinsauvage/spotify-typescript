import Image from 'next/image';

import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import List from '@/components/List/List';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { getEnpointPlaylist, getPlaylistTracks } from '@/lib/Spotify/playlist';
import { PlaylistResponseInterface, PlaylistTracksInterface } from '@/types';

import styles from './page.module.scss';

interface PageInterface {
  params: { playlistId: string };
  searchParams: { page: string };
}

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const page = Number(searchParams.page || 1);

  const playlistResponse: PlaylistResponseInterface = await getEnpointPlaylist(params.playlistId);
  const playlistTracks: PlaylistTracksInterface = await getPlaylistTracks(params.playlistId, page);

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
  } = playlistResponse || {};

  const image = images?.at(0);

  return (
    <div className={styles.page}>
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
              <LinkPrimary href={`/recommendations/playlists/${id}`}>
                See Track Recommendations
              </LinkPrimary>
            </div>
          </div>
        </div>
      </PageBannerWrapper>

      <Container>
        <List>
          {playlistTracks?.items?.map((track) => (
            <TrackRow key={track.track.id} track={track.track} playlistId={id} />
          ))}
        </List>
        <Pagination
          currentPage={page}
          totalPages={Math.floor(playlistTracks?.total / playlistTracks?.limit)}
          navigate
        />
      </Container>
    </div>
  );
};

export default Page;
