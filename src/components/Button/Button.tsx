/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProperties {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProperties> = ({ children, type = 'button', ...rest }) => (
  <button type={type} className={styles.button} {...rest}>
    {children}
  </button>
);

export default Button;
