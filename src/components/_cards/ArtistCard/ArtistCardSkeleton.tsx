import styles from './ArtistCardSkeleton.module.scss';

const ArtistCardSkeleton: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div className={styles.artistCardSkeleton} style={{ animationDelay: `${index * 0.2}s` }}>
      <div className={styles.skeletonImage} style={{ animationDelay: `${index * 0.2}s` }} />
      <div className={styles.skeletonName} style={{ animationDelay: `${index * 0.2}s` }} />
      <div className={styles.skeletonFollowers} style={{ animationDelay: `${index * 0.2}s` }} />
    </div>
  );
};

export default ArtistCardSkeleton;
