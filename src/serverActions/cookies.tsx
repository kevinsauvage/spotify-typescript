'use server';

import { cookies } from 'next/headers';

const deleteTokens = async () => {
  cookies().delete('spotify_token');
};

export default deleteTokens;
