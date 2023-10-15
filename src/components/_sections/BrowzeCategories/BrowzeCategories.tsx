import CategoryCard from '@/components/_cards/CategoryCard/CategoryCard';
import Grid from '@/components/Grid/Grid';
import Section from '@/components/Section/Section';
import { BrowzeCategory } from '@/types';

interface IBrowzeCategoriesProperties {
  browseCategories: BrowzeCategory[];
  title?: string;
  href?: string;
}

const BrowzeCategories: React.FC<IBrowzeCategoriesProperties> = ({
  browseCategories,
  title,
  href,
}) => {
  return (
    Array?.isArray(browseCategories) && (
      <Section title={title} href={href}>
        <Grid>
          {browseCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Grid>
      </Section>
    )
  );
};

export default BrowzeCategories;
