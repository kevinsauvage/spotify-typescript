import { headers } from 'next/headers';
import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';

interface IBreadcrumbsProperties {
  config?: {
    [index: number]: {
      href?: string;
      name?: string;
    };
  };
}

const Breadcrumbs: React.FC<IBreadcrumbsProperties> = ({ config }) => {
  const headersList = headers();
  const href = headersList.get('x-href');
  const url = new URL(href ?? '');
  const pathname = url.pathname;
  const breadcrumbs = pathname?.split('/').filter((crumb) => crumb !== '') ?? [];

  const isLast = (index: number) => index === breadcrumbs.length - 1;

  return (
    <div className={styles.Breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => {
        const path = `/${breadcrumbs.slice(0, index + 1).join('/')}`; // Construct dynamic href

        return (
          <div key={breadcrumb} className={`${styles.crumb} ${isLast(index) && styles.active}`}>
            {config?.[index]?.href ? (
              <Link href={config?.[index]?.href ?? ''}>{config?.[index]?.name}</Link>
            ) : (
              <Link href={path}>{breadcrumb}</Link>
            )}
            {!isLast(index) && <span className={styles.separator}>/</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
