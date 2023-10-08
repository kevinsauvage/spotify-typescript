import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import CallbackCodeHandler from '@/components/CallbackCodeHandler/CallbackCodeHandler';
import { login } from '@/lib/Spotify/auth';

const extractCode = (url: string) => {
  const parsedUrl = new URL(url);
  const queryParameters = new URLSearchParams(parsedUrl.searchParams);
  return queryParameters.get('code') ?? '';
};

const Page = async () => {
  const headersList = headers();
  const href = headersList.get('x-href');

  if (!href) {
    console.error('Callback page: no href');
    return redirect('/login');
  }
  const code = extractCode(href);

  if (!code) {
    console.error('Callback page: no code');
    return redirect('/login');
  }

  return <CallbackCodeHandler code={code} login={login} />;
};

export default Page;
