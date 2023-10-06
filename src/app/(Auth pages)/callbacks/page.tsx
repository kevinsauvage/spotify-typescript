'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import ScreenLoader from '@/components/ScreenLoader/ScreenLoader';
import { loginServerAction } from '@/serverActions/auth';

const extractTokenAndExpires = (url: string) => {
  const parsedUrl = new URL(url);

  const queryParameters = new URLSearchParams(parsedUrl.searchParams);

  const code = queryParameters.get('code') ?? '';

  return { code };
};

const Page = () => {
  const { push } = useRouter();
  const [isCalled, setIsCalled] = useState(false);

  const handleLogin = useCallback(async () => {
    if (isCalled) return;
    try {
      const { href } = window.location;

      const { code } = extractTokenAndExpires(href);

      if (code) {
        setIsCalled(true);
        await loginServerAction(code);
      } else {
        push('/login');
      }
    } catch (error) {
      console.error(error);
      push('/login');
    }
  }, [isCalled, push]);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  return <ScreenLoader />;
};

export default Page;
