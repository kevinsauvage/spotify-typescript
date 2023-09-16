import Link from 'next/link';

import styles from './LinkPrimary.module.scss';

interface IProperties {
  children: React.ReactNode;
  href: string;
  target?: string;
}

const LinkPrimary: React.FC<IProperties> = ({ children, href, target = '_self' }) => {
  return (
    <Link href={href} className={styles.LinkPrimary} target={target}>
      {children}
    </Link>
  );
};

export default LinkPrimary;
