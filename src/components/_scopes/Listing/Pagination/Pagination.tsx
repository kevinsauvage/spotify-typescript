'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Back from '@/assets/icons/back';
import BackDoble from '@/assets/icons/backDoble';
import Right from '@/assets/icons/right';
import RightDoble from '@/assets/icons/rightDoble';

import styles from './Pagination.module.scss';

interface IProperties {
  currentPage: number;
  totalPages: number;
  navigate?: boolean;
  handleUpdate?: (page: number) => void;
}

const Pagination: React.FC<IProperties> = ({ currentPage, totalPages, navigate, handleUpdate }) => {
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const router = useRouter();

  const handleChange = (page: number) => {
    if (navigate) {
      const parameters = new URLSearchParams(searchParameters);
      parameters.set('page', page.toString());
      const path = `${pathname}?${parameters.toString()}`;
      router.push(path);
    }
    handleUpdate?.(page);
  };

  if (totalPages <= 1) return <div />;

  const renderPageButton = (page: number) => (
    <button
      key={page}
      className={`${styles.item} ${styles.number} ${currentPage === page && styles.active}`}
      type="button"
      onClick={() => handleChange(page)}
    >
      {page}
    </button>
  );

  const renderEllipsis = (key: string) => (
    <button key={key} className={`${styles.item} ${styles.ellipsis}`} type="button" disabled>
      ...
    </button>
  );

  const renderPageRange = () => {
    const pageRange = [];

    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 || // Always show the first page
        page === totalPages || // Always show the last page
        (page >= currentPage - 1 && page <= currentPage + 1) // Show pages around the current page
      ) {
        pageRange.push(renderPageButton(page));
      } else if (page === currentPage - 2 && currentPage > 2) {
        // Show ellipsis before
        pageRange.push(renderEllipsis('left-ellipsis'));
      } else if (page === currentPage + 2 && page < totalPages - 2) {
        // Show ellipsis after
        pageRange.push(renderEllipsis('right-ellipsis'));
      }
    }

    return pageRange;
  };

  return (
    <nav className={styles.pagination}>
      <button
        className={`${styles.item} ${styles.arrow}`}
        disabled={currentPage === 1}
        type="button"
        onClick={() => handleChange(1)}
        aria-label="Go to first page"
      >
        <BackDoble />
      </button>
      <button
        className={`${styles.item} ${styles.arrow}`}
        disabled={currentPage === 1}
        type="button"
        onClick={() => handleChange(currentPage - 1)}
        aria-label="Go back one page"
      >
        <Back />
      </button>
      <div className={styles.items}>{renderPageRange()}</div>
      <button
        className={`${styles.item} ${styles.arrow}`}
        disabled={currentPage === totalPages}
        type="button"
        onClick={() => handleChange(currentPage + 1)}
        aria-label="Go forward one page"
      >
        <Right />
      </button>
      <button
        className={`${styles.item} ${styles.arrow}`}
        disabled={currentPage === totalPages}
        type="button"
        onClick={() => handleChange(totalPages)}
        aria-label="Go to last page"
      >
        <RightDoble />
      </button>
    </nav>
  );
};

export default Pagination;
