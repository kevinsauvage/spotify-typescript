'use client';

import { useState } from 'react';

import { useParams, usePathname } from 'next/navigation';

import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary';
import { TrackInterface } from '@/types';

import ScreenLoader from '../ScreenLoaderAbsolute/ScreenLoader';

import styles from './AddToPlaylist.module.scss';

interface IProperties {
  tracks: TrackInterface[];
  addItemsToPlaylist: (
    playlistId: string,
    tracks: string[],
    pathname: string,
  ) => Promise<{ snapshot_id: string }>;
}

const AddToPlaylist: React.FC<IProperties> = ({ tracks, addItemsToPlaylist }) => {
  const parameters = useParams();
  const playlistId = parameters?.playlistId;
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const addToPlaylist = async () => {
    setIsLoading(true);

    const response = await addItemsToPlaylist(
      Array.isArray(playlistId) ? playlistId?.join(',') : playlistId,
      tracks.map((track) => track.uri),
      pathname,
    );
    setIsLoading(false);

    if (response?.snapshot_id) {
      alert('tracks correctly added to the playlist');
    } else {
      alert('something went wrong adding the tracks to the playlist');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.AddToPlaylist}>
      {isLoading && <ScreenLoader />}
      {playlistId && <ButtonPrimary onClick={addToPlaylist}>Add to current Playlist</ButtonPrimary>}
    </div>
  );
};

export default AddToPlaylist;
