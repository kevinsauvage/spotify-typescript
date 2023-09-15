import Link from 'next/link';

import styles from './FiltersPerdiod.module.scss';

const filters = [
  { id: 1, param: undefined, title: 'All times' },
  { id: 2, param: 'medium_term', title: '6 months' },
  { id: 3, param: 'short_term', title: '1 month' },
];

interface FiltersPeriodInterface {
  path: string;
  period?: string;
}

const FiltersPeriod: React.FC<FiltersPeriodInterface> = ({ path, period }) => (
  <div className={styles.filtersPeriod}>
    {filters.map(({ param, title, id }) => (
      <Link
        href={`${path}?period=${param || ''}`}
        key={id}
        className={`${styles.filtersPeriodItem} ${period === param && styles.active}`}
      >
        {title}
      </Link>
    ))}
  </div>
);

export default FiltersPeriod;
