import BannerArtist from '@/components/_banners/BannerArtist/BannerArtist';
import { getArtist } from '@/lib/Spotify/artist';

interface IProperties {
  children: React.ReactNode;
  params: { artistId: string };
}

const layout: React.FC<IProperties> = async ({ children, params }) => {
  const artist = await getArtist(params.artistId);

  return (
    <div>
      <BannerArtist artist={artist} />
      {children}
    </div>
  );
};

export default layout;
