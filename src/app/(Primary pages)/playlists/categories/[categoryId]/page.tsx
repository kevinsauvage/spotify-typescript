import PlaylistCard from '@/components/_cards/PlaylistCard/PlaylistCard';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Section from '@/components/Section/Section';
import Title from '@/components/Title/Title';
import { getBrowseCategory, getBrowseCategoryPlaylists } from '@/lib/Spotify/playlist';
import { BrowzeCategoriesPlaylistsResponse, BrowzeCategory } from '@/types';

interface PageInterface {
  params: { categoryId: string };
  searchParams: { page: string };
}

const limit = 30;

const Page: React.FC<PageInterface> = async ({ searchParams, params }) => {
  const page = Number(searchParams?.page || 1);
  const { categoryId } = params;

  const [browseCategoryPlaylist, browzeCategory]: [
    BrowzeCategoriesPlaylistsResponse,
    BrowzeCategory,
  ] = await Promise.all([
    getBrowseCategoryPlaylists('party', 'US', page, limit),
    getBrowseCategory(categoryId, 'US'),
  ]);

  return (
    <Container>
      <Breadcrumbs
        config={{
          2: {
            href: `/playlists/categories/${categoryId}`,
            name: browzeCategory?.name,
          },
        }}
      />
      <PageBannerWrapper>
        <Title>{browzeCategory?.name} Playlists</Title>
      </PageBannerWrapper>
      <Section>
        <Grid>
          {browseCategoryPlaylist?.playlists?.items.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </Grid>
      </Section>
      <Pagination
        totalPages={Math.ceil(browseCategoryPlaylist?.playlists?.total / limit)}
        currentPage={page}
        navigate
      />
    </Container>
  );
};

export default Page;
