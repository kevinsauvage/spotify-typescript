import styles from './AlbumTable.module.scss';

const AlbumTable: React.FC<{
  children: React.ReactNode;
  remove?: boolean;
  showPopularity?: boolean;
}> = ({ children, showPopularity }) => {
  return (
    <table className={styles.table}>
      <colgroup>
        <col width="50px" />
        <col width="40%" />
        <col width="30%" />
        <col width="20%" />
        {showPopularity && <col width="15%" />}
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th>Cover</th>
          <th>Name</th>
          <th>Artist</th>
          <th>Year</th>
          {showPopularity && <th>Popularity</th>}
          <th>Tracks</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default AlbumTable;
