import { useEffect, useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import SectionTitle from '@components/SectionTitle';
import { api } from '@services/api';
import type { SectionProps } from '@common/types';
import type { TasksResponse } from '@common/schemas/tasks';
import snakeImg from '@assets/images/snake-tasks.webp';
import { highlightText } from '@common/utils/highlightText';
import styles from './MultiTasksSection.module.scss';

const MultiTasksSection: FC<SectionProps> = ({ onRegister }) => {
  const [data, setData] = useState<TasksResponse | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getTasks().then(setData).catch(console.error);
  }, []);

  useEffect(() => {
    onRegister({
      element: rootRef.current,
      playIn: async (direction) => {
        await gsap.fromTo(
          contentRef.current,
          { y: direction > 0 ? 50 : -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }
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
    <section id="tasks" ref={rootRef} className={styles.section}>
      <div className={styles.wrapper} ref={contentRef}>
        <SectionTitle>Multi-Tasks</SectionTitle>

        <div className={styles.layout}>
          <div className={styles.left}>
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

          <div className={styles.grid}>
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
