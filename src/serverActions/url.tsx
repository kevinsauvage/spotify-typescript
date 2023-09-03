'use server';

import { redirect } from 'next/navigation';

// eslint-disable-next-line import/prefer-default-export
export const redirectUrl = (url: string) => redirect(url);
