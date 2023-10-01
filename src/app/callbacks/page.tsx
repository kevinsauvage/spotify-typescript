'use client';

import { useEffect } from 'react';

import { redirect, useRouter } from 'next/navigation';

import ScreenLoader from '@/components/ScreenLoader/ScreenLoader';
import { loginServerAction } from '@/serverActions/auth';

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

  useEffect(() => {
    const { href } = window.location;
    const { accessToken, expiresInSeconds } = extractTokenAndExpires(href);
    if (accessToken) {
      loginServerAction(accessToken, Number(expiresInSeconds));
      redirect('/');
    } else push('/login');
  }, [push]);

  return <ScreenLoader />;
};

export default Page;
