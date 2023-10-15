import TrackCard from '@/components/_cards/TrackCard/TrackCard';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import { TrackInterface } from '@/types';

const RecommendedTracks: React.FC<{
  title?: string;
  recommendations: {
    tracks: TrackInterface[];
  };
}> = ({ recommendations, title }) =>
  Array?.isArray(recommendations?.tracks) && (
    <Section title={title}>
      <Grid>
        {recommendations.tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </Grid>
    </Section>
  );

export default RecommendedTracks;
