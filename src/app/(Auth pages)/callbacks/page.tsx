import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import CallbackCodeHandler from '@/components/CallbackCodeHandler/CallbackCodeHandler';
import { login } from '@/lib/Spotify/auth';

const extractCode = (url: string) => {
  const parsedUrl = new URL(url);
  const queryParameters = new URLSearchParams(parsedUrl.searchParams);
  const code = queryParameters.get('code') ?? '';

  return { code };
};

const Page = async () => {
  const headersList = headers();
  const pathname = headersList.get('x-href');

  if (!pathname) {
    console.error('no pathname');
    return redirect('/login');
  }
  const { code } = extractCode(pathname) || {};

  if (!code) {
    console.error('no code');
    return redirect('/login');
  }

  return <CallbackCodeHandler code={code} login={login} />;
};

export default Page;
