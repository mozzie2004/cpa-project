import type { SectionProps } from '@common/types';
import gsap from 'gsap';
import { useEffect, useRef, type FC } from 'react';

export const MultiplyBenefits: FC<SectionProps> = ({ onRegister }) => {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onRegister({
      element: rootRef.current,
      playIn: async (direction) => {
        await gsap.fromTo(
          contentRef.current,
          { y: direction > 0 ? 50 : -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
        );
      },
      playOut: async (direction) => {
        await gsap.to(contentRef.current, {
          y: direction > 0 ? -50 : 50,
          opacity: 0,
          duration: 0.5
        });
      }
    });
  }, [onRegister]);

  return (
    <section
      id="benefits"
      ref={rootRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className="section"
    >
      <h2 ref={contentRef}>MultiplyBenefits</h2>
    </section>
  );
};
