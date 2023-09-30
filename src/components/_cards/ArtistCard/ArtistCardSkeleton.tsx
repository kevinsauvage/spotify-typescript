import styles from './ArtistCardSkeleton.module.scss';

const ArtistCardSkeleton = () => {
  return (
    <div className={styles.artistCardSkeleton}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonName} />
    </div>
  );
};

export default ArtistCardSkeleton;
