import { TrackInterface } from '@/components/_cards/Track/Track';
import TrackList from '@/components/_scopes/Listing/ListingTracks/ListingTracks';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointRecentTracks } from '@/lib/Spotify/user';

export interface RecentlyPlayedInterface {
  items: [{ track: TrackInterface }];
}

const page: React.FC = async () => {
  const recentlyPlayed: RecentlyPlayedInterface = await getEndpointRecentTracks(50);

  return (
    <div>
      <PageBannerWrapper>
        <Title>Recently Played Tracks</Title>
      </PageBannerWrapper>
      <TrackList tracks={recentlyPlayed?.items?.map((track) => track?.track)} />
    </div>
  );
};

export default page;
