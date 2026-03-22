import { useEffect, useRef, type FC } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { SectionProps, SectionRef } from '@common/types';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);

interface ScrollSystemProps {
  sections: FC<SectionProps>[];
}

export const ScrollSystem: FC<ScrollSystemProps> = ({ sections }) => {
  const sectionRefs = useRef<(SectionRef | null)[]>([]);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);

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

      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash) as HTMLElement;
        if (target) {
          gsap.set(window, { scrollTo: { y: target } });
          const targetIdx = sectionRefs.current.findIndex(
            (item) => item?.element === target
          );
          if (targetIdx !== -1) currentIndex.current = targetIdx;
        }
      }

      sectionRefs.current.forEach((section) => {
        ScrollTrigger.create({
          trigger: section?.element,
          start: 'top bottom',
          onEnter: async (self) => {
            if (section?.element) {
              isAnimating.current = true;
              await section?.playIn(self.direction);
              isAnimating.current = false;
            }
          },
          onEnterBack: async (self) => {
            if (section?.element) {
              isAnimating.current = true;
              await section?.playIn(self.direction);
              isAnimating.current = false;
            }
          }
        });
      });
    });

    return () => mm.revert();
  }, [sections.length]);

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
