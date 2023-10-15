import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import BrowzeCategories from '@/components/_sections/BrowzeCategories/BrowzeCategories';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getBrowseCategories } from '@/lib/Spotify/playlist';
import { BrowzeCategoriesResponse } from '@/types';

interface PageInterface {
  params: object;
  searchParams: { page: string };
}

const limit = 30;

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const page = Number(searchParams?.page || 1);

  const [browseCategories]: [BrowzeCategoriesResponse] = await Promise.all([
    getBrowseCategories('US', page, limit),
  ]);

  const { categories } = browseCategories;

  return (
    <Container>
      <Breadcrumbs />
      <PageBannerWrapper>
        <Title>Playlists Categories</Title>
      </PageBannerWrapper>
      <BrowzeCategories browseCategories={categories?.items} />
      <Pagination totalPages={Math.ceil(categories?.total / limit)} currentPage={page} navigate />
    </Container>
  );
};

export default Page;
