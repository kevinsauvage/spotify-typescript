/* eslint-disable import/no-extraneous-dependencies */

import Heart from '@/assets/icons/heart';
import Micro from '@/assets/icons/microphone';
import Music from '@/assets/icons/music';
import Library from '@/assets/icons/music-library';
import Person from '@/assets/icons/person';

import NavItem from './NavItem/NavItem';

import styles from './Navigation.module.scss';

const navItems = [
  { href: '/', icon: <Person />, label: 'Profile' },
  { href: '/tracks', icon: <Heart />, label: 'Tracks' },
  { href: '/artists', icon: <Micro />, label: 'Artists' },
  { href: '/albums', icon: <Library />, label: 'Albums' },
  { href: '/playlists', icon: <Music />, label: 'Playlists' },
];

const Navigation = () => (
  <nav className={styles.navigation}>
    <ul>
      {navItems.map((item) => (
        <NavItem key={item.href} item={item} />
      ))}
    </ul>
  </nav>
);

export default Navigation;
