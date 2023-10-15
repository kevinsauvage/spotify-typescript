import Image from 'next/image';
import Link from 'next/link';

import { BrowzeCategory } from '@/types';

import styles from './CategoryCard.module.scss';

interface ICategoryCardProperties {
  category: BrowzeCategory;
}

const CategoryCard: React.FC<ICategoryCardProperties> = ({ category }) => {
  const { id, name, icons } = category;
  const [icon] = icons;

  return (
    <Link href={`/playlists/categories/${id}`}>
      <div className={styles.CategoryCard}>
        <div className={styles.image}>
          <Image src={icon.url} alt={name} width={300} height={300} />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
    </Link>
  );
};

export default CategoryCard;
