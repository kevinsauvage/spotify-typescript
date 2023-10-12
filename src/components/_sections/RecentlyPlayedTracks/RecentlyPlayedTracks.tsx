import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Section from '@/components/Section/Section';
import { RecentlyPlayedInterface } from '@/types';

const RecentlyPlayedTracks: React.FC<{
  recentlyPlayedTracks: RecentlyPlayedInterface;
}> = ({ recentlyPlayedTracks }) =>
  Array?.isArray(recentlyPlayedTracks?.items) && (
    <Section title="Recently Played">
      <TrackTable>
        {recentlyPlayedTracks.items.map((track) => (
          <TrackRow key={track.track.id} track={track.track} />
        ))}
      </TrackTable>
    </Section>
  );

export default RecentlyPlayedTracks;
