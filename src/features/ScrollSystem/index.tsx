import { useEffect, useRef, type FC } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { SectionProps, SectionRef } from '@common/types';
import { useLocation } from 'react-router';

gsap.registerPlugin(Observer, ScrollToPlugin);

interface ScrollSystemProps {
  sections: FC<SectionProps>[];
}

export const ScrollSystem: FC<ScrollSystemProps> = ({ sections }) => {
  const sectionRefs = useRef<(SectionRef | null)[]>([]);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);

  const { hash } = useLocation();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const gotoSection = async (index: number, direction: number) => {
        if (isAnimating.current || index < 0 || index >= sections.length)
          return;

        const currentSection = sectionRefs.current[currentIndex.current];
        const nextSection = sectionRefs.current[index];

        if (currentSection && nextSection && nextSection.element) {
          isAnimating.current = true;

          try {
            await currentSection.playOut(direction);

            await gsap.to(window, {
              scrollTo: { y: nextSection.element, autoKill: false },
              duration: 0
            });

            await nextSection.playIn(direction);

            currentIndex.current = index;
            window.history.pushState(
              null,
              '',
              `#${nextSection.element.id || index}`
            );
          } finally {
            isAnimating.current = false;
          }
        }
      };

      Observer.create({
        target: window,
        type: 'wheel,touch,pointer',
        onUp: () => gotoSection(currentIndex.current - 1, -1),
        onDown: () => gotoSection(currentIndex.current + 1, 1),
        tolerance: 40,
        preventDefault: true
      });
    });

    return () => mm.revert();
  }, [sections.length]);

  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    if (window.location.hash) return;

    const firstSection = sectionRefs.current[0];
    if (firstSection?.element) {
      firstSection.playIn(1);
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash) as HTMLElement;

      if (target) {
        const targetIdx = sectionRefs.current.findIndex(
          (item) => item?.element === target
        );
        if (targetIdx !== -1) {
          currentIndex.current = targetIdx;

          const section = sectionRefs.current[targetIdx];
          if (section?.element && window.matchMedia('(min-width: 768px)').matches) {
            gsap.to(window, {
              scrollTo: { y: section.element, autoKill: false },
              duration: 0
            });
            section.playIn(1);
          }
        }
      }
    }
  }, [hash]);

  return (
    <main>
      {sections.map((Section, i) => (
        <Section
          key={i}
          onRegister={(ref) => {
            sectionRefs.current[i] = ref;
          }}
        />
      ))}
    </main>
  );
};
