'use client';

import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import ScreenLoader from '@/components/ScreenLoader/ScreenLoader';
import { storeToken } from '@/serverActions/cookies';
import { redirectUrl } from '@/serverActions/url';

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

  const spotifyCallback = useCallback(async (accessToken: string, expiresIn: string) => {
    const response = await storeToken(accessToken, Number(expiresIn));
    if (response) return redirectUrl('/');
    console.error(`Error: ${response}`);
  }, []);

  useEffect(() => {
    const { href } = window.location;
    const { accessToken, expiresInSeconds } = extractTokenAndExpires(href);
    if (accessToken) spotifyCallback(accessToken, expiresInSeconds);
    else push('/login');
  }, [push, spotifyCallback]);

  return <ScreenLoader />;
};

export default Page;
