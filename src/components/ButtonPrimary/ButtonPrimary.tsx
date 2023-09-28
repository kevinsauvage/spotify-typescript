'use client';

import styles from './ButtonPrimary.module.scss';

interface IProperties {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonPrimary: React.FC<IProperties> = ({ children, onClick, disabled }) => {
  return (
    <button onClick={() => onClick()} className={styles.ButtonPrimary} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
