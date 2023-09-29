import styles from './List.module.scss';

interface IProperties {
  children: React.ReactNode;
}

const List: React.FC<IProperties> = ({ children }) => {
  return <div className={styles.List}>{children}</div>;
};

export default List;
