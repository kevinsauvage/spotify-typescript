import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/Header/Header';
import SideBar from '@/components/SideBar/SideBar';

import '../styles/globals.scss';
import styles from './Layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description:
    'Spotify profile, playlist and track analysis tool built with Next.js and TypeScript.',
  title: 'Spotify profile',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className} ${styles.body}`}>
      <SideBar />
      <main className={styles.main}>
        <Header />

        <div className={styles.children}>{children}</div>
      </main>
    </body>
  </html>
);

export default RootLayout;
