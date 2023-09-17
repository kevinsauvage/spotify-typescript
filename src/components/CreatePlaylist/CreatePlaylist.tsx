'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { TrackInterface } from '../_cards/Track/Track';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import ScreenLoader from '../ScreenLoader/ScreenLoader';

import styles from './CreatePlaylist.module.scss';

interface IProperties {
  tracks: TrackInterface[];
  name: string;
  description: string;
  isPublic: boolean;
  user: { id: string };
  createPlaylist: (
    name: string,
    description: string,
    isPublic: boolean,
    userId: string,
  ) => Promise<{ id: string }>;
  addItemsToPlaylist: (
    playlistId: string,
    tracks: TrackInterface[],
  ) => Promise<{ snapshot_id: string }>;
}

const CreatePlaylist: React.FC<IProperties> = ({
  tracks,
  name,
  description,
  isPublic,
  user,
  createPlaylist,
  addItemsToPlaylist,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleCreatePlaylist = async () => {
    setIsLoading(true);
    const playlist = await createPlaylist(name, description, isPublic, user.id);

    if (tracks.length === 0) return setIsLoading(false);
    if (!playlist?.id) {
      alert('something went wrong creating the playlist');
      return setIsLoading(false);
    }
    const response = await addItemsToPlaylist(playlist.id, tracks);

    if (response?.snapshot_id) {
      push(`/playlists/${playlist.id}`);
    } else {
      alert('something went wrong adding the tracks to the playlist');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.CreatePlaylist}>
      {isLoading && <ScreenLoader />}
      <ButtonPrimary onClick={handleCreatePlaylist}>Create Playlist from Results</ButtonPrimary>
    </div>
  );
};

export default CreatePlaylist;
