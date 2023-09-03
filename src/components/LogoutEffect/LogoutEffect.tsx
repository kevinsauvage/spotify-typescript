'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import deleteTokens from '@/serverActions/cookies';

const LogoutEffect: React.FC = () => {
  useEffect(() => {
    deleteTokens();
    redirect('/login');
  }, []);

  return <div />;
};

export default LogoutEffect;
