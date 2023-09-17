'use client';

import styles from './ButtonPrimary.module.scss';

interface IProperties {
  children: React.ReactNode;
  onClick: () => void;
}

const ButtonPrimary: React.FC<IProperties> = ({ children, onClick }) => {
  return (
    <button onClick={() => onClick()} className={styles.ButtonPrimary}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
