'use client';

import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import ScreenLoader from '@/components/ScreenLoader/ScreenLoader';

const extractTokenAndExpires = (url: string) => {
  const parsedUrl = new URL(url);
  const fragment = parsedUrl.hash.slice(1);
  const queryParameters = new URLSearchParams(fragment);

  const accessToken = queryParameters.get('access_token') ?? '';
  const expiresInSeconds = queryParameters.get('expires_in') ?? '';

  return {
    accessToken,
    expiresInSeconds,
  };
};

const Page = () => {
  const { push } = useRouter();

  const spotifyCallback = useCallback(
    async (accessToken: string, expiresIn: string) => {
      const response = await fetch('/api/spotifyCallback', {
        body: JSON.stringify({ accessToken, expiresIn }),
        method: 'POST',
      });

      if (response?.status === 200) {
        push('/');
      } else {
        console.error(`Error: ${response.status}`);
      }
    },
    [push]
  );

  useEffect(() => {
    const { href } = window.location;
    const { accessToken, expiresInSeconds } = extractTokenAndExpires(href);

    if (accessToken) {
      spotifyCallback(accessToken, expiresInSeconds);
    } else {
      push('/');
    }
  }, [push, spotifyCallback]);

  return <ScreenLoader />;
};

export default Page;
