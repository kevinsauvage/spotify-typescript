import styles from './ItemDetailsRow.module.scss';

interface IProperties {
  children: React.ReactNode;
}

const ItemDetailsRow: React.FC<IProperties> = ({ children }) => {
  return <div className={styles.ItemDetailsRow}>{children}</div>;
};

export default ItemDetailsRow;
