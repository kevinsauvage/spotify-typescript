import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import Container from '@/components/Container/Container';
import List from '@/components/List/List';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointRecentTracks } from '@/lib/Spotify/user';
import { RecentlyPlayedInterface } from '@/types';

const page: React.FC = async () => {
  const recentlyPlayedTracks: RecentlyPlayedInterface = await getEndpointRecentTracks(50);

  return (
    <div>
      <PageBannerWrapper>
        <Title>Recently Played Tracks</Title>
      </PageBannerWrapper>
      <Container>
        <List>
          {recentlyPlayedTracks?.items?.map((track) => (
            <TrackRow key={track.track.id} track={track.track} />
          ))}
        </List>
      </Container>
    </div>
  );
};

export default page;
