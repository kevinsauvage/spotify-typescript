import PopularityIcon from '@/assets/icons/popularity';

import styles from './Popularity.module.scss';

interface IProperties {
  popularity: number;
  extratyles?: string;
}

const Popularity: React.FC<IProperties> = ({ popularity, extratyles }) => {
  return (
    !Number.isNaN(popularity) &&
    popularity !== undefined && (
      <div className={`${styles.Popularity} ${extratyles}`}>
        <span>{popularity}</span>
        <PopularityIcon />
      </div>
    )
  );
};

export default Popularity;
