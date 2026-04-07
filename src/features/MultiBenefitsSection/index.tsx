import { useEffect, useRef, useState, type FC } from 'react';
import styles from './MultiBenefitsSection.module.scss';
import type { SectionProps } from '@common/types';
import SectionTitle from '@components/SectionTitle';
import gsap from 'gsap';

import snakeImg from '@assets/images/snake-benefits.webp';
import Marquee from './Marquee';
import { highlightText } from '@common/utils/highlightText';
import { api, setApiLang } from '@services/api';
import type { BenefitsResponse } from '@common/schemas/benefits';
import { useLocale } from '@hooks/useLocale';

const MultiBenefitsSection: FC<SectionProps> = ({ onRegister }) => {
  const { locale } = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<BenefitsResponse | null>(null);

  useEffect(() => {
    setApiLang(locale);
    api.getBenefits().then(setData).catch(console.error);
  }, [locale]);

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
            {data && (
              <>
                <p className={styles.benefits__subtitle}>
                  {highlightText(
                    data.title,
                    'guaranteed',
                    styles.benefits__highlight
                  )}
                </p>
                <p className={styles.benefits__description}>
                  {data.description}
                </p>
              </>
            )}
          </div>
          <div ref={rightContentRef} className={styles.benefits__items}>
            {data?.benefits.map((text) => (
              <div key={text} className={styles.benefits__item}>
                {text}
              </div>
            ))}
            <div ref={imageRef} className={styles.benefits__image}>
              <img src={snakeImg} alt="snake" />
            </div>
          </div>
          <Marquee />
        </div>
      </div>
    </section>
  );
};

export default MultiBenefitsSection;
