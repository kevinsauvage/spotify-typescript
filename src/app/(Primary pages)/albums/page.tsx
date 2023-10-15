import NewAlbums from '@/components/_sections/NewAlbums/NewAlbums';
import SavedAlbums from '@/components/_sections/SavedAlbums/SavedAlbums';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getNewRelease } from '@/lib/Spotify/album';
import { getEndpointSavedAlbums } from '@/lib/Spotify/user';
import { NewReleasesAlbums, SavedAlbumResponseInterface } from '@/types';

interface PageInterface {}

const Page: React.FC<PageInterface> = async () => {
  const [savedAlbums, newReleases]: [SavedAlbumResponseInterface, NewReleasesAlbums] =
    await Promise.all([getEndpointSavedAlbums(1, 10), getNewRelease('US', 1, 10)]);

  return (
    <Container>
      <PageBannerWrapper>
        <Title>Albums</Title>
      </PageBannerWrapper>
      <NewAlbums newReleases={newReleases} />
      <SavedAlbums savedAlbums={savedAlbums} />
    </Container>
  );
};

export default Page;
