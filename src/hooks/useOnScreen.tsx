import { useEffect, useState } from 'react';

const useOnScreen = (
  reference: React.MutableRefObject<HTMLDivElement | null>,
  rootMargin = '0px',
) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    if (reference.current) {
      observer.observe(reference.current);
    }
    return () => {
      if (reference.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(reference.current);
      }
    };
  }, [reference, rootMargin]);

  return isIntersecting;
};

export default useOnScreen;
