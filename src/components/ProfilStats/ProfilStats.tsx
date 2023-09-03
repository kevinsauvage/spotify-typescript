import styles from './ProfilStats.module.scss';

export interface StatInterface {
  title: string;
  value: number;
}

interface ProfilStatsProperties {
  stats: StatInterface[];
}

const ProfilStats: React.FC<ProfilStatsProperties> = ({ stats }) => (
  <div className={styles.stats}>
    {Array.isArray(stats) &&
      stats.map(({ title, value }) => (
        <div key={title} className={styles.stat}>
          <p className={styles.value}>{value}</p>
          <p className={styles.title}>{title}</p>
        </div>
      ))}
  </div>
);

export default ProfilStats;
