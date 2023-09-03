import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Container from '@/components/Container/Container';
import SideBar from '@/components/SideBar/SideBar';

import '../styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description:
    'Spotify profile, playlist and track analysis tool built with Next.js and TypeScript.',
  title: 'Spotify profile',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <SideBar />
      <Container>{children}</Container>
    </body>
  </html>
);

export default RootLayout;
