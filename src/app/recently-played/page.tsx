import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import TrackTable from '@/components/TrackTable/TrackTable';
import { getEndpointRecentTracks } from '@/lib/Spotify/user';
import { RecentlyPlayedInterface } from '@/types';

import styles from './page.module.scss';
const page: React.FC = async () => {
  const recentlyPlayedTracks: RecentlyPlayedInterface = await getEndpointRecentTracks(50);

  return (
    <Container className={styles.page}>
      <PageBannerWrapper>
        <Title>Recently Played Tracks</Title>
      </PageBannerWrapper>
      <TrackTable>
        {recentlyPlayedTracks?.items?.map((track) => (
          <TrackRow key={track.track.id} track={track.track} />
        ))}
      </TrackTable>
    </Container>
  );
};

export default page;
