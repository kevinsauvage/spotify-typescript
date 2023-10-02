import BannerPlaylist from '@/components/_banners/BannerPlaylist/BannerPlaylist';
import { getEnpointPlaylist } from '@/lib/Spotify/playlist';
import { PlaylistResponseInterface } from '@/types';

interface IProperties {
  children: React.ReactNode;
  params: { playlistId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const playlist: PlaylistResponseInterface = await getEnpointPlaylist(params.playlistId);

  return (
    <div>
      <BannerPlaylist playlist={playlist} />
      {children}
    </div>
  );
};

export default layout;
