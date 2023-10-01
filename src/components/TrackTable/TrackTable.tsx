import styles from './TrackTable.module.scss';

const TrackTable: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <table className={styles.table}>
      <colgroup>
        <col width="50px" />
        <col width="100%" />
        <col width="65px" />
        <col width="80px" />
      </colgroup>
      <thead>
        <tr>
          <th>Album</th>
          <th>Info</th>
          <th>Popularity</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default TrackTable;
