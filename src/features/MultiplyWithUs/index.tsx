import type { SectionProps } from '@common/types';
import gsap from 'gsap';
import { useEffect, useRef, type FC } from 'react';

export const MultiplyWithUs: FC<SectionProps> = ({ onRegister }) => {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onRegister({
      element: rootRef.current,
      playIn: async (direction) => {
        await gsap.fromTo(
          contentRef.current,
          { x: direction > 0 ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
        );
      },
      playOut: async (direction) => {
        await gsap.to(contentRef.current, {
          x: direction > 0 ? -50 : 50,
          opacity: 0,
          duration: 0.5
        });
      }
    });
  }, [onRegister]);

  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      id="withUs"
      ref={rootRef}
      className="section"
    >
      <h2 ref={contentRef}>MultiplyWithUs</h2>
    </section>
  );
};
