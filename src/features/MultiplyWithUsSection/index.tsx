import type { SectionProps } from '@common/types';
import gsap from 'gsap';
import { Fragment, useEffect, useRef, useState, type FC } from 'react';

import styles from './MultiplyWithUs.module.scss';
import SectionTitle from '@components/SectionTitle';
import Tab from './Tab';
import clsx from 'clsx';
import ArrowIcon from '@assets/icons/arrow.svg?react';
import Button from '@components/Button/Button';
import { useModal } from '@hooks/useModal';
import { api, setApiLang } from '@services/api';
import type { MultiplyResponse } from '@common/schemas/multiply';
import { useLocale } from '@hooks/useLocale';
import { capitalizeFirst } from '@common/utils/capitalizeFirst';
import multiplyData from '@data/multiply.json';

export const MultiplyWithUs: FC<SectionProps> = ({ onRegister }) => {
  const { locale } = useLocale();
  const t = multiplyData[locale];
  const { openModal } = useModal();
  const rootRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<number>(0);

  const [data, setData] = useState<MultiplyResponse | null>(null);

  useEffect(() => {
    setApiLang(locale);
    api.getMultiply().then(setData).catch(console.error);
  }, [locale]);

  useEffect(() => {
    onRegister({
      element: rootRef.current,
      playIn: async () => {
        const tl = gsap.timeline();

        await tl
          .fromTo(
            wrapperRef.current,
            {
              y: 0,
              opacity: 0
            },
            { y: 0, opacity: 1, duration: 0.8 }
          )
          .fromTo(
            contentRef.current,
            {
              opacity: 0
            },
            { opacity: 1, duration: 0.8 },
            '<'
          )
          .fromTo(
            footerRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
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

  const handleChangeTab = (key: number) => {
    setActiveTab(key);
  };

  return (
    <section id="withUs" ref={rootRef} className={styles.multiply}>
      <div className={styles.multiply__wrapper} ref={wrapperRef}>
        <SectionTitle>MULTIPLY WITH US</SectionTitle>
        <div ref={contentRef} className={styles.multiply__container}>
          {data && (
            <>
              <div className={styles.multiply__tabs}>
                {data.map((item, i) => (
                  <Tab
                    isActive={i === activeTab}
                    onClick={handleChangeTab}
                    key={i}
                    value={i}
                  >
                    {locale === 'ru'
                      ? item.title
                      : capitalizeFirst(item.title.split('_').join(' '))}
                  </Tab>
                ))}
              </div>
              <div className={styles.multiply__right}>
                <div className={styles.multiply__content}>
                  {data.map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        styles.multiply__contentInner,
                        i === activeTab && styles.multiply__contentInner_active
                      )}
                    >
                      {Object.entries(item.steps).map(([key, text]) => (
                        <Fragment key={key}>
                          <p className={styles.multiply__text}>{text}</p>
                          <ArrowIcon className={styles.multiply__arrow} />
                        </Fragment>
                      ))}
                      <Button
                        label={
                          t.btns[item.title as keyof typeof t.btns] ||
                          t.btns.default
                        }
                        onClick={() => openModal('form', {})}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.multiply__footer} ref={footerRef}>
                  <div className={styles.multiply__footerLinks}>
                    <a
                      className={styles.multiply__footerLink}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      instagram
                    </a>
                    <a
                      className={styles.multiply__footerLink}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      telegram
                    </a>
                    <a
                      className={styles.multiply__footerLink}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin
                    </a>
                  </div>
                  <a className={styles.multiply__footerLink} href="#hero">
                    {t.scrollToTop}
                    <ArrowIcon className={styles.multiply__footerArrow} />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
