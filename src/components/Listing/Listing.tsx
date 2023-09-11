import Pagination from '../Pagination/Pagination';
import { TrackInterface } from '../Track/Track';
import TrackList from '../TrackList/TrackList';

//import styles from './Listing.module.scss';

export interface TracksInterface {
  items: [{ track: TrackInterface }];
  total: number;
  limit: number;
  offset: number;
  next: string;
  previous: string;
}

interface IProperties {
  tracks: TracksInterface;
}

const Listing: React.FC<IProperties> = ({ tracks }) => (
  <div>
    <TrackList tracks={tracks?.items?.map((track) => track?.track)} />
    <Pagination currentPage={1} totalPages={tracks?.total} navigate />
  </div>
);

export default Listing;
