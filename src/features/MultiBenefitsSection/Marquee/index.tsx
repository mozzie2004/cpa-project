import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import styles from './Marquee.module.scss';
import Logo from '@assets/icons/logo.svg?react';

const Marquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const width = el.scrollWidth / 3;

    gsap.fromTo(
      el,
      { x: 0 },
      {
        x: -width - 145,
        duration: 8,
        ease: 'linear',
        repeat: -1
      }
    );
  }, []);

  return (
    <div className={styles.marquee}>
      <div className={styles.marquee__line} ref={trackRef}>
        <span>Dream big earn bigger!</span> <Logo />
        <span>Dream big earn bigger!</span> <Logo />
        <span>Dream big earn bigger!</span> <Logo />
      </div>
    </div>
  );
};

export default Marquee;
