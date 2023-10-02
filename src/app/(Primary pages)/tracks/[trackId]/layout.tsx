import BannerTrack from '@/components/_banners/BannerTrack/BannerTrack';
import { getTrack } from '@/lib/Spotify/track';
import { TrackInterface } from '@/types';

interface IProperties {
  children: React.ReactNode;
  params: { trackId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const track: TrackInterface = await getTrack(params?.trackId);

  return (
    <div>
      <BannerTrack track={track} />
      {children}
    </div>
  );
};

export default layout;
