'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const deleteTokens = async () => cookies().delete('spotify_token');

export const storeToken = async (accessToken: string, expiresIn: number) => {
  try {
    const currentTime = Math.floor(Date.now() / 1000);

    cookies().set({
      httpOnly: true,
      maxAge: expiresIn,
      name: 'spotify_token',
      value: JSON.stringify({ accessToken, expiresIn: currentTime + expiresIn }),
    });

    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

export const logoutServerAction = () => {
  cookies().delete('spotify_token');
  redirect('/login');
};

export default deleteTokens;
