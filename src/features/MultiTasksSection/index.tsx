import { useEffect, useState } from 'react';
import SectionTitle from '@components/SectionTitle';
import { api } from '@services/api';
import type { TasksResponse } from '@common/types';
import snakeImg from '@assets/images/snake-tasks.webp';
import styles from './MultiTasksSection.module.scss';

const MultiTasksSection = () => {
  const [data, setData] = useState<TasksResponse | null>(null);

  useEffect(() => {
    api.getTasks().then(setData).catch(console.error);
  }, []);

  return (
    <section className={styles.section}>
      <SectionTitle>Multi-Tasks</SectionTitle>

      <div className={styles.layout}>
        <div className={styles.left}>
          {data && <p className={styles.description}>{data.description}</p>}
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
    </section>
  );
};

export default MultiTasksSection;
