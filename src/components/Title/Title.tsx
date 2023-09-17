import styles from './Title.module.scss';

interface IProperties {
  children: React.ReactNode;
}

const Title: React.FC<IProperties> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default Title;
