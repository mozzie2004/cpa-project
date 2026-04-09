import { useEffect, useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import SectionTitle from '@components/SectionTitle';
import { api, setApiLang } from '@services/api';
import type { SectionProps } from '@common/types';
import type { TasksResponse } from '@common/schemas/tasks';
import snakeImg from '@assets/images/snake-tasks.webp';
import { highlightText } from '@common/utils/highlightText';
import styles from './MultiTasksSection.module.scss';
import { useLocale } from '@hooks/useLocale';

const MultiTasksSection: FC<SectionProps> = ({ onRegister }) => {
  const { locale } = useLocale();
  const [data, setData] = useState<TasksResponse | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setApiLang(locale);
    api.getTasks().then(setData).catch(console.error);
  }, [locale]);

  useEffect(() => {
    onRegister({
      element: rootRef.current,
      playIn: async () => {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });

        const cards = gridRef.current?.children;
        if (!cards || cards.length === 0) return;

        const firstTwo = [cards[0], cards[1]];
        const lastThree = Array.from(cards).slice(2);

        const tl = gsap.timeline();
        tl.fromTo(
          titleRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        ).fromTo(
          leftRef.current,
          { x: -200, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '<0.1'
        )
          .fromTo(
            firstTwo,
            { x: 200, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.1
            },
            '<0.2'
          )
          .fromTo(
            lastThree,
            { x: 200, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.1
            },
            '-=0.3'
          );
        await tl;
      },
      playOut: async (direction) => {
        const tl = gsap.timeline();
        tl.to(contentRef.current, {
          y: direction > 0 ? -50 : 50,
          opacity: 0,
          duration: 0.5
        });
        await tl;
      }
    });
  }, [onRegister]);

  return (
    <section id="tasks" ref={rootRef} className={styles.section}>
      <div className={styles.wrapper} ref={contentRef}>
        <div ref={titleRef}>
          <SectionTitle>Multi-Tasks</SectionTitle>
        </div>

        <div className={styles.layout}>
          <div className={styles.left} ref={leftRef}>
            {data && (
              <p className={styles.description}>
                {highlightText(
                  data.description,
                  'in-house team',
                  styles.highlight
                )}
              </p>
            )}
            <div className={styles.imageWrapper}>
              <img
                className={styles.snakeImage}
                src={snakeImg}
                alt="Snake illustration"
              />
            </div>
          </div>

          <div className={styles.grid} ref={gridRef}>
            {data?.tiles.map(({ title, text }) => (
              <div key={title} className={styles.card}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiTasksSection;
