import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import FiltersPeriod from '@/components/_scopes/Listing/FiltersPeriod/FiltersPeriod';
import Pagination from '@/components/_scopes/Listing/Pagination/Pagination';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Section from '@/components/Section/Section';
import Title from '@/components/Title/Title';
import { getEndpointTopArtists } from '@/lib/Spotify/user';
import { UserTopArtistInterface } from '@/types';

interface PageInterface {
  params: object;
  searchParams: { period: string; page: string };
}

const Page: React.FC<PageInterface> = async ({ searchParams }) => {
  const period = searchParams?.period || undefined;
  const page = Number(searchParams.page || 1);
  const topArtists: UserTopArtistInterface = await getEndpointTopArtists(page, period, 30);

  return (
    <Container>
      <PageBannerWrapper>
        <Title>Top Artists</Title>
      </PageBannerWrapper>
      <Section>
        <FiltersPeriod path="/top-artists" period={period} />
        <Grid>
          {Array.isArray(topArtists.items) &&
            topArtists?.items?.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
        </Grid>
        <Pagination
          currentPage={page}
          totalPages={Math.floor(topArtists?.total / topArtists?.limit)}
          navigate
        />
      </Section>
    </Container>
  );
};

export default Page;
