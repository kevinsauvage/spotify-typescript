'use client';

import { useEffect, useState } from 'react';

import styles from './Slide.module.scss';

interface IProperties {
  buttonText: string;
  children: React.ReactNode;
}

const Slide: React.FC<IProperties> = ({ buttonText, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlide = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <div className={styles.slideContainer}>
      <button type="button" onClick={toggleSlide}>
        {buttonText}
      </button>
      {isOpen && <button className={styles.overlay} type="button" onClick={toggleSlide} />}
      <div className={`${styles.slide} ${isOpen ? styles.open : ''}`}>
        <div className={styles.slideContent}>
          <button type="button" onClick={toggleSlide} className={styles.closeButton}>
            Close
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Slide;
