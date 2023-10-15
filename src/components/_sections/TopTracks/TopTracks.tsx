import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Section from '@/components/Section/Section';
import { TrackInterface } from '@/types';

type TopTracksInterface = {
  tracks: TrackInterface[];
};

const TopTracks: React.FC<TopTracksInterface> = ({ tracks }) => {
  return (
    Array?.isArray(tracks) && (
      <Section title="Top Tracks" href="/tracks/top">
        <TrackTable>{tracks?.map((track) => <TrackRow key={track.id} track={track} />)}</TrackTable>
      </Section>
    )
  );
};

export default TopTracks;
