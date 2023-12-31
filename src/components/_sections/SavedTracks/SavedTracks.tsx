import TrackRow from '@/components/_rows/TrackRow/TrackRow';
import TrackTable from '@/components/_scopes/Listing/TrackTable/TrackTable';
import Section from '@/components/Section/Section';
import { UserSavedTracksInterface } from '@/types';

const SavedTracks: React.FC<{
  savedTracks: UserSavedTracksInterface;
}> = ({ savedTracks }) =>
  Array.isArray(savedTracks?.items) && (
    <Section title="Saved Tracks" href="/tracks/saved">
      <TrackTable>
        {savedTracks.items.map((track) => (
          <TrackRow key={track.track.id} track={track.track} />
        ))}
      </TrackTable>
    </Section>
  );

export default SavedTracks;
