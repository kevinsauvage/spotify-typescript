'use client';

import styles from './GenreSelector.module.scss';

interface IProperties {
  genres: string[];
  handleGenreChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedGenres: string[];
}

const GenreSelector: React.FC<IProperties> = ({ genres, handleGenreChange, selectedGenres }) => (
  <div className={styles.genreSelector}>
    <h2>Tunable Genres</h2>
    <div className={styles.genres}>
      {Array.isArray(genres) &&
        genres.map((genre) => (
          <div key={genre} className={styles.row}>
            <label htmlFor={genre}>{genre}</label>
            <input
              type="checkbox"
              id={genre}
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={handleGenreChange}
            />
          </div>
        ))}
    </div>
  </div>
);

export default GenreSelector;
