import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import ListingArtistsClient from '@/components/_scopes/Listing/ListingArtistsClient/ListingArtistsClient';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Title from '@/components/Title/Title';
import { getEndpointFollowedArtists } from '@/lib/Spotify/user';
import { FollowedArtistsInterface } from '@/types';

const LIMIT = 24;

interface PageInterface {}

const Page: React.FC<PageInterface> = async () => {
  const savedArtists: FollowedArtistsInterface = await getEndpointFollowedArtists(LIMIT);

  return (
    <Container>
      <Breadcrumbs />
      <PageBannerWrapper>
        <Title>Favorite Artists</Title>
      </PageBannerWrapper>
      <Grid>
        {savedArtists?.artists?.items?.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
        <ListingArtistsClient
          after={savedArtists?.artists?.cursors?.after}
          handleFetch={getEndpointFollowedArtists}
        />
      </Grid>
    </Container>
  );
};

export default Page;
