'use server';

import { cookies } from 'next/headers';

const deleteTokens = async () => {
  cookies().delete('spotify_token');
};

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

export default deleteTokens;
