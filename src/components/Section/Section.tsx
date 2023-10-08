import Link from 'next/link';

import styles from './Section.module.scss';

interface IProperties {
  title?: string;
  children: React.ReactNode;
  href?: string;
  buttonText?: string;
}

const Section: React.FC<IProperties> = ({ title, children, href, buttonText }) => {
  return (
    <div className={styles.Section}>
      {title && (
        <div className={styles.header}>
          {title && <p className={styles.title}>{title}</p>}
          {href && <Link href={href}>{buttonText ?? 'See all'}</Link>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Section;
