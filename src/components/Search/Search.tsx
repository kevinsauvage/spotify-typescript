'use client';
import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import SearchIcon from '@/assets/icons/search';

import styles from './Search.module.scss';

interface IProperties {}

const Search: React.FC<IProperties> = () => {
  const inputReference = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { current } = inputReference;
    if (current) {
      if (current.value === '') return;
      router.push(`/search?query=${current.value}`);
    }
  };

  return (
    <div className={styles.Search}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="search" className="sr">
          Search
        </label>
        <input type="text" id="search" name="search" ref={inputReference} />
        <button type="submit" aria-label="Search">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default Search;
