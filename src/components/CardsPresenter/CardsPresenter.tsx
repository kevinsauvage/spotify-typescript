import Link from 'next/link';

import Grid from '../Grid/Grid';

import styles from './CardsPresenter.module.scss';

interface IProperties {
  children: React.ReactNode[];
  title?: string;
  href?: string;
}

const CardsPresenter: React.FC<IProperties> = ({ children, title, href }) => {
  return (
    <div className={styles.presenter}>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        {href && <Link href={href}>See all</Link>}
      </div>
      <Grid>{children}</Grid>
    </div>
  );
};

export default CardsPresenter;
