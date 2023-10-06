import styles from './Wrapper.module.scss';

interface IWrapperProperties {
  children: React.ReactNode;
}

const Wrapper: React.FC<IWrapperProperties> = ({ children }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};

export default Wrapper;
