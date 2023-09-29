import Link from 'next/link';

import styles from './Section.module.scss';

interface IProperties {
  title?: string;
  children: React.ReactNode;
  href?: string;
}

const Section: React.FC<IProperties> = ({ title, children, href }) => {
  return (
    <div className={styles.Section}>
      <div className={styles.header}>
        {title && <p className={styles.title}>{title}</p>}
        {href && <Link href={href}>See all</Link>}
      </div>
      {children}
    </div>
  );
};

export default Section;
