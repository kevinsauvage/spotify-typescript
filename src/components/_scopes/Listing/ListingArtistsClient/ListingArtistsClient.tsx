'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ArtistCard from '@/components/_cards/ArtistCard/ArtistCard';
import ArtistCardSkeleton from '@/components/_cards/ArtistCard/ArtistCardSkeleton';
import useOnScreen from '@/hooks/useOnScreen';
import { ArtistInterface, FollowedArtistsInterface } from '@/types';

interface IProperties {
  handleFetch: (limit: number, after: string) => Promise<FollowedArtistsInterface>;
  after: string;
}

const limit = 15;

const ListingArtistsClient: React.FC<IProperties> = ({ handleFetch, after }) => {
  const bottomReference = useRef<HTMLDivElement>(null);
  const isOncreen = useOnScreen(bottomReference);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<ArtistInterface[]>([]);
  const [currentAfter, setCurrentAfter] = useState<string>(() => after);

  const getData = useCallback(async () => {
    if (!currentAfter) return;

    setLoading(true);
    const response = await handleFetch(limit, currentAfter);
    setLoading(false);

    if (!response) {
      setError(true);
      return;
    }

    setCurrentAfter(response?.artists?.cursors?.after);
    setData((previous) => [...previous, ...(response?.artists?.items || [])]);
  }, [currentAfter, handleFetch]);

  const skeletonKeys = useMemo(() => [...new Array(limit).keys()], []);

  useEffect(() => {
    if (isOncreen && !loading && !error) {
      getData();
    }
  }, [error, getData, isOncreen, loading]);

  return (
    <>
      {data.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
      {loading && skeletonKeys.map((key) => <ArtistCardSkeleton key={key} index={key} />)}
      {error && <div>Error</div>}
      <div ref={bottomReference} style={{ height: '2rem' }} />
    </>
  );
};

export default ListingArtistsClient;
