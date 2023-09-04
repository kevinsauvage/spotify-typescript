import ListingBanner from '@/components/ListingBanner/ListingBanner';
import { TrackInterface } from '@/components/Track/Track';
import TrackList from '@/components/TrackList/TrackList';
import { getArtist } from '@/lib/Spotify/artist';
import { getRecommendations } from '@/lib/Spotify/recommendations';

interface PageInterface {
  params: { artistId: string };
  searchParams: object;
}

const page: React.FC<PageInterface> = async ({ params }) => {
  const artistId = params?.artistId;

  const artist = await getArtist(artistId);

  const recommencedTracks: { tracks: [TrackInterface] } = await getRecommendations({
    seedArtists: artistId,
    seedGenres: '',
    seedTracks: '',
  });

  return (
    <div>
      <ListingBanner
        title={
          <>
            Recommendations for <strong>{artist?.name}</strong>
          </>
        }
      />

      <TrackList tracks={recommencedTracks?.tracks} />
    </div>
  );
};

export default page;
