import { useEffect, useRef, type FC } from 'react';
import styles from './MultiBenefitsSection.module.scss';
import type { SectionProps } from '@common/types';
import SectionTitle from '@components/SectionTitle';
import gsap from 'gsap';

import snakeImg from '@assets/images/snake-benefits.webp';
import Marquee from './Marquee';

const MultiBenefitsSection: FC<SectionProps> = ({ onRegister }) => {
  const rootRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onRegister({
      element: rootRef.current,
      playIn: async (direction) => {
        const tl = gsap.timeline();

        await tl
          .fromTo(
            wrapperRef.current,
            {
              y: direction * window.innerHeight,
              opacity: 0
            },
            { y: 0, opacity: 1, duration: 0.8 }
          )
          .fromTo(
            leftContentRef.current,
            {
              x: -(leftContentRef.current?.scrollWidth || 0) + 50,
              opacity: 0
            },
            { x: 0, opacity: 1, duration: 0.8 },
            '-=0.2'
          )
          .fromTo(
            rightContentRef.current,
            {
              x: window.innerWidth,
              opacity: 0
            },
            { x: 0, opacity: 1, duration: 0.8 },
            '<'
          )
          .fromTo(
            imageRef.current,
            {
              x: 200,
              opacity: 0
            },
            { x: 0, opacity: 1, duration: 0.4 },
            '-=0.2'
          );
      },
      playOut: async (direction) => {
        const tl = gsap.timeline();

        await tl.fromTo(
          wrapperRef.current,
          {
            y: 0,
            opacity: 1
          },
          {
            y: -direction * window.innerHeight,
            opacity: 1,
            duration: 0.8
          }
        );
      }
    });
  }, [onRegister]);
  return (
    <section id="benefits" ref={rootRef} className={styles.benefits}>
      <div ref={wrapperRef} className={styles.benefits__wrapper}>
        <SectionTitle>MULTI-BENEFITS</SectionTitle>
        <div className={styles.benefits__content}>
          <div ref={leftContentRef} className={styles.benefits__left}>
            <p className={styles.benefits__subtitle}>
              Results can only be guaranteed when you control every step
            </p>
            <p className={styles.benefits__description}>
              That’s why we built a full-time in-house team and custom
              infrastructure – tailored for every task, tested daily in the
              sweepstakes vertical
            </p>
          </div>
          <div ref={rightContentRef} className={styles.benefits__items}>
            <div className={styles.benefits__item}>
              We take on outsourced projects across any niche — from iGaming and
              dating to e-commerce and recruitment
            </div>
            <div className={styles.benefits__item}>
              We deliver what has already proven effective — many times over
            </div>
            <div className={styles.benefits__item}>
              We don’t learn at the client’s expense
            </div>
            <div ref={imageRef} className={styles.benefits__image}>
              <img src={snakeImg} alt="snake" />
            </div>
          </div>
        </div>
        <Marquee />
      </div>
    </section>
  );
};

export default MultiBenefitsSection;
