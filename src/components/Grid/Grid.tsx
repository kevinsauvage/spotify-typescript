import styles from './Grid.module.scss';

interface IProperties {
  children: React.ReactNode;
}

const Grid: React.FC<IProperties> = ({ children }) => {
  return <div className={styles.Grid}>{children}</div>;
};

export default Grid;
