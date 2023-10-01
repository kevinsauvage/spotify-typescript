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
        {showAlbum && <col width="50px" />}
        <col width="100%" />
        {showPopularity && <col width="65px" />}
        <col width="80px" />
        {remove && <col width="80px" />}
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
