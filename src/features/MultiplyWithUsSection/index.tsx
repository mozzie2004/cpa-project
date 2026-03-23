import type { SectionProps } from '@common/types';
import gsap from 'gsap';
import { Fragment, useEffect, useRef, useState, type FC } from 'react';

import styles from './MultiplyWithUs.module.scss';
import SectionTitle from '@components/SectionTitle';
import { data, type TabKey } from './data';
import Tab from './Tab';
import clsx from 'clsx';
import ArrowIcon from '@assets/icons/arrow.svg?react';
import Button from '@components/Button/Button';
import { useModal } from '@features/ModalProvider';

export const MultiplyWithUs: FC<SectionProps> = ({ onRegister }) => {
  const { openModal } = useModal();
  const rootRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabKey>('media');

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

  const handleChangeTab = (key: TabKey) => {
    setActiveTab(key);
  };

  return (
    <section id="withUs" ref={rootRef} className={styles.multiply}>
      <div className={styles.multiply__wrapper} ref={wrapperRef}>
        <SectionTitle>MULTIPLY WITH US</SectionTitle>
        <div ref={contentRef} className={styles.multiply__container}>
          <div className={styles.multiply__tabs}>
            {Object.entries(data).map(([key, item]) => (
              <Tab
                isActive={key === activeTab}
                onClick={handleChangeTab}
                key={key}
                value={key as TabKey}
              >
                {item.tab}
              </Tab>
            ))}
          </div>
          <div className={styles.multiply__right}>
            <div className={styles.multiply__content}>
              {Object.entries(data).map(([key, item]) => (
                <div
                  key={key}
                  className={clsx(
                    styles.multiply__contentInner,
                    key === activeTab && styles.multiply__contentInner_active
                  )}
                >
                  {item.items.map((text, i) => (
                    <Fragment key={i}>
                      <p className={styles.multiply__text}>{text}</p>
                      <ArrowIcon className={styles.multiply__arrow} />
                    </Fragment>
                  ))}
                  <Button
                    label={item.btn}
                    onClick={() => openModal('form', {})}
                  />
                </div>
              ))}
            </div>
            <div className={styles.multiply__footer}>
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
                Scroll to Top
                <ArrowIcon className={styles.multiply__footerArrow} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
