'use client';

import { useEffect, useRef } from 'react';

interface IProperties {
  getData: () => void;
}

const InfiniteScroll: React.FC<IProperties> = ({ getData }) => {
  const bottomReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        getData();
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    });

    if (bottomReference.current) {
      observer.observe(bottomReference.current);
    }
  }, [getData]);

  return <div ref={bottomReference} />;
};

export default InfiniteScroll;
