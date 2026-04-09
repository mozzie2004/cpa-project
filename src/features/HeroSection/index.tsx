import { useEffect, useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import Button from '@components/Button/Button';
import SocialLinks from '@components/SocialLinks/SocialLinks';
import heroData from '@data/hero.json';
import type { SectionProps } from '@common/types';
import snakeImg from '@assets/images/snake.webp';
import styles from './HeroSection.module.scss';
import { useModal } from '@hooks/useModal';
import { useLocale } from '@hooks/useLocale';

export const HeroSection: FC<SectionProps> = ({ onRegister }) => {
  const { locale } = useLocale();
  const { openModal } = useModal();
  const t = heroData[locale];

  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  const words = t.heading_accents;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!accentRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    words.forEach((_, i) => {
      tl.fromTo(
        accentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: 'power2.out',
          onStart: () => setWordIndex(i)
        }
      ).to(accentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.1,
        ease: 'power2.in',
        delay: 1
      });
    });

    return () => {
      tl.kill();
    };
  }, [words]);

  useEffect(() => {
    onRegister({
      element: rootRef.current,
      playIn: async () => {
        gsap.killTweensOf([contentRef.current, socialRef.current]);
        const tl = gsap.timeline();
        tl.fromTo(
          contentRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }
        ).fromTo(
          socialRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '<0.2'
        );
        await tl;
      },
      playOut: async (direction) => {
        const tl = gsap.timeline();
        tl.to(contentRef.current, {
          x: direction > 0 ? -100 : 100,
          opacity: 0,
          duration: 0.5
        }).to(socialRef.current, { y: 50, opacity: 0, duration: 0.4 }, '<');
        await tl;
      }
    });
  }, [onRegister]);

  return (
    <section id="hero" ref={rootRef} className={styles.hero}>
      <div className={styles.wrapper}>
        <div className={styles.content} ref={contentRef}>
          <h1 className={styles.heading}>
            {t.heading_1}
            <br />
            {t.heading_2}{' '}
            <span ref={accentRef} className={styles.accent}>
              {words[wordIndex]}
            </span>
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
      <div ref={socialRef} className={styles.socialIcons}>
        <SocialLinks />
      </div>
    </section>
  );
};
