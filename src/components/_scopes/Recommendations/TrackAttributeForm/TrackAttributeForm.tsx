'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import Trash from '@/assets/icons/trash';
import Slide from '@/components/Slide/Slide';
import areArraysEqual from '@/utils/array';
import { getMinuteFromMilliseconds } from '@/utils/date';
import hasDifferentPathnameAndSearchParameters from '@/utils/url';

import GenreSelector from '../GenreSelector/GenreSelector';
import TunableAttribute from '../TunableAttributes/TunableAttributes';

import attributes from './TrackAttributeForm.config';

import styles from './TrackAttributeForm.module.scss';

interface IAttributes {
  [key: string]: string;
}

interface IProperties {
  genres: string[];
  initialParams: { [key: string]: string };
  seedGenres: string[];
}

const getLabel = (key: string) => attributes.find((att) => att.name === key)?.label;

const TrackAttributeForm: React.FC<IProperties> = ({ genres, initialParams, seedGenres }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [attributeValues, setAttributeValues] = useState<IAttributes>(initialParams || {});
  const [selectedGenres, setSelectedGenres] = useState<string[]>(seedGenres || []);

  useEffect(() => {
    if (initialParams) {
      setAttributeValues(initialParams);
    }
  }, [initialParams]);

  useEffect(() => {
    if (seedGenres) {
      setSelectedGenres(seedGenres);
    }
  }, [seedGenres]);

  const handleChangeAttribute = (name: string, value: number) => {
    setAttributeValues({ ...attributeValues, [name]: value?.toString() });
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    const searchParameters = new URLSearchParams();

    Object.entries(attributeValues || {}).forEach(([key, value]) => {
      if (value?.toString()?.trim()) searchParameters.append(key, value);
    });

    if (selectedGenres?.length) searchParameters.append('seedGenres', selectedGenres.join(','));

    router.push(`${pathname}?${searchParameters.toString()}`);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  const removeAttribute = (name: string) => {
    const newAttributeValues = { ...attributeValues };
    delete newAttributeValues[name];
    setAttributeValues(newAttributeValues);
  };

  const removeGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre));
  };

  const showButtons = () =>
    !hasDifferentPathnameAndSearchParameters(initialParams, attributeValues) &&
    areArraysEqual(seedGenres, selectedGenres) &&
    seedGenres.length === 0 &&
    Object.keys(initialParams).length === 0;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.slideButtons}>
          <Slide buttonText="Filters">
            <TunableAttribute
              handleChangeAttribute={handleChangeAttribute}
              attributeValues={attributeValues}
            />
          </Slide>

          <Slide buttonText="Genres">
            <GenreSelector
              handleGenreChange={handleGenreChange}
              genres={genres}
              selectedGenres={selectedGenres}
            />
          </Slide>
        </div>

        {Object.keys(attributeValues).length > 0 && (
          <div className={styles.selectedAttibutes}>
            <h3 className={styles.title}>Selected attributes</h3>
            <div className={styles.attributes}>
              {Object.entries(attributeValues).map(([key, value]) => (
                <div
                  className={`${styles.item} ${initialParams[key] === value && styles.applied}`}
                  key={key}
                >
                  <div className={styles.key}>{getLabel(key)}:</div>
                  <div className={styles.value}>
                    {getLabel(key) === 'Duration (min)'
                      ? getMinuteFromMilliseconds(Number(value) || 0) || 0
                      : value}
                  </div>
                  <button
                    type="button"
                    className={styles.trashButton}
                    onClick={() => removeAttribute(key)}
                  >
                    {<Trash />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedGenres?.length > 0 && (
          <div className={styles.selectedGenres}>
            <h3 className={styles.title}>Selected genres</h3>
            <div className={styles.genres}>
              {selectedGenres.map((genre) => (
                <div
                  key={genre}
                  className={`${styles.item} ${seedGenres.includes(genre) && styles.applied}`}
                >
                  {genre}
                  <button
                    type="button"
                    className={styles.trashButton}
                    onClick={() => removeGenre(genre)}
                  >
                    {<Trash />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!showButtons() && (
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.button}
              disabled={
                !hasDifferentPathnameAndSearchParameters(initialParams, attributeValues) &&
                areArraysEqual(seedGenres, selectedGenres)
              }
            >
              Submit
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={() => {
                router.push(pathname);
              }}
              disabled={showButtons()}
            >
              Reset settings
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TrackAttributeForm;
