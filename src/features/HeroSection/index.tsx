import { useEffect, useRef, type FC } from 'react';
import gsap from 'gsap';
import Button from '@components/Button/Button';
import SocialLinks from '@components/SocialLinks/SocialLinks';
import heroData from '@data/hero.json';
import type { SectionProps } from '@common/types';
import snakeImg from '@assets/images/snake.webp';
import styles from './HeroSection.module.scss';
import { useModal } from '@hooks/useModal';

const lang = 'en';

export const HeroSection: FC<SectionProps> = ({ onRegister }) => {
  const { openModal } = useModal();
  const t = heroData[lang];

  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    <section id="hero" ref={rootRef} className={styles.hero}>
      <div ref={contentRef}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            {t.heading_1}
            <br />
            {t.heading_2}{' '}
            <span className={styles.accent}>{t.heading_accent}</span>
          </h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
          <Button onClick={() => openModal('form', {})} label={t.button} />
        </div>

        <div className={styles.imageWrapper}>
          <img
            className={styles.snakeImage}
            src={snakeImg}
            alt="Snake illustration"
          />
        </div>
      </div>
      <SocialLinks className={styles.socialIcons} />
    </section>
  );
};
