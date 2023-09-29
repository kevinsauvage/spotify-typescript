import Link from 'next/link';

import List from '../List/List';

import styles from './RowsPresenter.module.scss';

interface IProperties {
  title?: string;
  children: React.ReactNode;
  href?: string;
}

const RowsPresenter: React.FC<IProperties> = ({ title, children, href }) => {
  return (
    <div className={styles.RowsPresenter}>
      <div className={styles.header}>
        {title && <p className={styles.title}>{title}</p>}
        {href && <Link href={href}>See all</Link>}
      </div>
      <List>{children}</List>
    </div>
  );
};

export default RowsPresenter;
