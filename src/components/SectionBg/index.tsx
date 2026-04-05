import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './SectionBg.module.scss';

export const SPOTLIGHT_EDGE_DURATION = 4;
const SPOT_LEFT_MID = { x: 10, y: 50 } as const;
const SPOT_TOP_RIGHT = { x: 90, y: 10 } as const;
const SPOT_BOTTOM_RIGHT = { x: 90, y: 90 } as const;

const SPOTLIGHT_PAUSE = 1.5;

const SectionBg = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const pos = { x: SPOT_LEFT_MID.x, y: SPOT_LEFT_MID.y };

    const apply = () => {
      el.style.setProperty('--spot-cx', `${pos.x}%`);
      el.style.setProperty('--spot-cy', `${pos.y}%`);
    };

    let rafId = 0;
    const scheduleApply = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        apply();
      });
    };

    apply();

    const tl = gsap.timeline({ repeat: -1 });

    const move = (x: number, y: number) =>
      tl.to(pos, {
        x,
        y,
        duration: SPOTLIGHT_EDGE_DURATION,
        ease: 'power2.inOut',
        onUpdate: scheduleApply
      });

    const pause = () => tl.to({}, { duration: SPOTLIGHT_PAUSE });

    move(SPOT_TOP_RIGHT.x, SPOT_TOP_RIGHT.y);
    pause();
    move(SPOT_LEFT_MID.x, SPOT_LEFT_MID.y);
    pause();
    move(SPOT_BOTTOM_RIGHT.x, SPOT_BOTTOM_RIGHT.y);
    pause();
    move(SPOT_LEFT_MID.x, SPOT_LEFT_MID.y);
    pause();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      tl.kill();
    };
  }, []);

  return <div ref={rootRef} className={styles.bg}></div>;
};

export default SectionBg;
