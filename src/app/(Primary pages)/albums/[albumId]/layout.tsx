import BannerAlbum from '@/components/_banners/BannerAlbum/BannerAlbum';
import { getAlbumById } from '@/lib/Spotify/album';

interface IProperties {
  children: React.ReactNode;
  params: { albumId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const { albumId } = params || {};
  const album = await getAlbumById(albumId);

  return (
    <div>
      <BannerAlbum album={album} />
      {children}
    </div>
  );
};

export default layout;
