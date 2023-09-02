/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';

import Link from 'next/link';

import styles from './LinkButton.module.scss';

interface ButtonProperties {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href: string;
}

const LinkButton: React.FC<ButtonProperties> = ({ children, type = 'button', ...rest }) => (
  <Link type={type} className={styles.link} {...rest}>
    {children}
  </Link>
);

export default LinkButton;
