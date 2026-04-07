import { useState, useEffect } from 'react';
import Logo from '@assets/icons/logo.svg?react';
import styles from './Preloader.module.scss';

const DURATION = 2500;
const INTERVAL = 100;
const STEP = 100 / (DURATION / INTERVAL);

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + STEP;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      onComplete();
    }
  }, [progress, onComplete]);

  return (
    <div className={styles.preloader}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.content}>
        <span className={styles.percentage}>{Math.floor(progress)}%</span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
