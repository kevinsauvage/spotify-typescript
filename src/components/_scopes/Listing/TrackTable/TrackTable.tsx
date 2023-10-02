import styles from './TrackTable.module.scss';

const TrackTable: React.FC<{
  children: React.ReactNode;
  remove?: boolean;
  showAlbum?: boolean;
  showPopularity?: boolean;
}> = ({ children, remove, showAlbum = true, showPopularity = true }) => {
  return (
    <table className={styles.table}>
      <colgroup>
        {showAlbum && <col className={styles.colCover} />}
        <col className={styles.colInfo} />
        {showPopularity && <col className={styles.colPopularity} />}
        <col className={styles.colDuration} />
        {remove && <col className={styles.colRemove} />}
      </colgroup>
      <thead>
        <tr>
          {showAlbum && <th>Album</th>}
          <th>Info</th>
          {showPopularity && <th>Popularity</th>}
          <th>Duration</th>
          {remove && <th>Remove</th>}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default TrackTable;
