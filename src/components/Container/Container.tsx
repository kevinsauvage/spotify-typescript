import styles from './Container.module.scss';

interface ContainerProperties {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProperties> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default Container;
