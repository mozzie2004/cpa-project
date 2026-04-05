import { useEffect, useRef, type FC } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { SectionProps, SectionRef } from '@common/types';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router';

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);

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

      sectionRefs.current.forEach((section) => {
        ScrollTrigger.create({
          trigger: section?.element,
          start: 'top bottom',
          onEnter: async (self) => {
            if (section?.element) {
              await section?.playIn(self.direction);
            }
          },
          onEnterBack: async (self) => {
            if (section?.element) {
              await section?.playIn(self.direction);
            }
          }
        });
      });
    });

    return () => mm.revert();
  }, [sections.length]);

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash) as HTMLElement;

      if (target) {
        const targetIdx = sectionRefs.current.findIndex(
          (item) => item?.element === target
        );
        if (targetIdx !== -1) currentIndex.current = targetIdx;
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
