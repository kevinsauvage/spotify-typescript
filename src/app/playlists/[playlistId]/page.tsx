import Image from 'next/image';

import { TrackInterface } from '@/components/_cards/Track/Track';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import LinkPrimary from '@/components/LinkPrimary/LinkPrimary';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import { getEnpointPlaylist, getPlaylistTracks } from '@/lib/Spotify/playlist';

import styles from './page.module.scss';

interface PageInterface {
  params: { playlistId: string };
  searchParams: { page: string };
}

interface PlaylistResponseInterface {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: [{ height: number; url: string; width: number }];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
}

interface PlaylistTracksInterface {
  href: string;
  items: [{ track: TrackInterface }];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

const Page: React.FC<PageInterface> = async ({ params, searchParams }) => {
  const page = Number(searchParams.page || 1);

  const playlistResponse: PlaylistResponseInterface = await getEnpointPlaylist(params.playlistId);

  const playlistTracks: PlaylistTracksInterface = await getPlaylistTracks(params.playlistId, page);

  const {
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
          {image?.url && <Image alt="Album cover" src={image.url} width={300} height={300} />}
          <div className={styles.details}>
            <h1 className={styles.name}>{playlistResponse.name}</h1>
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
            </div>
          </div>
        </div>
      </PageBannerWrapper>

      <Container>
        <TrackList tracks={playlistTracks?.items.map((track) => track.track)} />
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
