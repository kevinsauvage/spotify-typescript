'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavItem.module.scss';

export interface NavItemInterface {
  item: {
    href: string;
    label: string;
    icon: ReactNode;
  };
}

// improve the following code by adding an active stape,
const NavItem: React.FC<NavItemInterface> = ({ item }) => {
  const pathname = usePathname();

  const { label, href, icon } = item;

  return (
    <li className={`${styles.navItem} ${pathname === href ? styles.active : ''}`}>
      <Link href={href}>
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavItem;
