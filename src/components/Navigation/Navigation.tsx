import { useState } from 'react';
import Logo from '@assets/icons/logo.svg?react';
import CloseIcon from '@assets/icons/close-icon.svg?react';
import SocialLinks from '@components/SocialLinks/SocialLinks';
import heroData from '@data/hero.json';
import styles from './Navigation.module.scss';
import { useLocale } from '@hooks/useLocale';
import clsx from 'clsx';
import type { Lang } from '@common/types';

const navHrefs = ['#team', '#benefits', '#withUs'];

const Navigation = () => {
  const { locale, setLocale } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = heroData[locale];

  const handleChangeLocale = (locale: Lang) => {
    setLocale(locale);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>
          <Logo />
        </a>
        <div className={styles.rightGroup}>
          <ul className={styles.links}>
            {t.nav.map((label, i) => (
              <li key={navHrefs[i]}>
                <a href={navHrefs[i]} className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.langSwitcher}>
            <button
              onClick={() => setLocale('en')}
              className={clsx(
                styles.langBtn,
                locale === 'en' && styles.langBtnActive
              )}
              type="button"
            >
              Eng
            </button>
            /
            <button
              onClick={() => setLocale('ru')}
              className={clsx(
                styles.langBtn,
                locale === 'ru' && styles.langBtnActive
              )}
              type="button"
            >
              Рус
            </button>
          </div>
        </div>
        <button
          className={styles.menuBtn}
          type="button"
          onClick={() => setIsMenuOpen(true)}
        >
          {t.menu}
        </button>
      </nav>

      {isMenuOpen && (
        <div className={styles.overlay}>
          <div className={styles.overlayHeader}>
            <a href="/" className={styles.logoMobile}>
              <Logo />
            </a>
            <button
              className={styles.closeBtn}
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <ul className={styles.overlayLinks}>
            <li>
              <a
                href="/"
                className={styles.overlayLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.home}
              </a>
            </li>
            {t.nav.map((label, i) => (
              <li key={navHrefs[i]}>
                <a
                  href={navHrefs[i]}
                  className={styles.overlayLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <SocialLinks className={styles.socialIcons} />

          <div className={styles.overlayLangSwitcher}>
            <button
              className={clsx(
                styles.overlayLangBtn,
                locale === 'en' && styles.overlayLangBtnActive
              )}
              type="button"
              onClick={() => handleChangeLocale('en')}
            >
              Eng
            </button>
            /
            <button
              className={clsx(
                styles.overlayLangBtn,
                locale === 'ru' && styles.overlayLangBtnActive
              )}
              type="button"
              onClick={() => handleChangeLocale('ru')}
            >
              Рус
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
