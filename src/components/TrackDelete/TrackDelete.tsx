'use client';

import { useCallback, useState } from 'react';

import { usePathname } from 'next/navigation';

import Trash from '@/assets/icons/trash';

import ScreenLoader from '../ScreenLoaderAbsolute/ScreenLoader';

import styles from './TrackDelete.module.scss';
interface IProperties {
  playlistId: string;
  uri: string;
  removeFromPlaylist: (
    playlistId: string,
    tracks: string[],
    pathname: string,
  ) => Promise<{ snapshot_id: string }>;
}
const TrackDelete: React.FC<IProperties> = ({ playlistId, uri, removeFromPlaylist }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleRemoveFromPlaylist = useCallback(async () => {
    setIsLoading(true);
    const response = await removeFromPlaylist(playlistId, [uri], pathname);
    setIsLoading(false);

    if (!response?.snapshot_id) {
      alert('something went wrong removing the track from the playlist');
    }
  }, [removeFromPlaylist, playlistId, uri, pathname]);

  return (
    <div className={styles.TrackDelete}>
      {isLoading && <ScreenLoader />}
      <button onClick={handleRemoveFromPlaylist} disabled={isLoading}>
        {<Trash />}
      </button>
    </div>
  );
};

export default TrackDelete;
