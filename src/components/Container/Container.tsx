import styles from './Container.module.scss';

interface ContainerProperties {
  children: React.ReactNode;
  className?: string;
}
const Container: React.FC<ContainerProperties> = ({ children, className }) => (
  <div className={`${styles.container} ${className}`}>{children}</div>
);

export default Container;
