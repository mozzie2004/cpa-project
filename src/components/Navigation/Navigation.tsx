import { useState } from 'react';
import Logo from '@assets/icons/logo.svg?react';
import CloseIcon from '@assets/icons/close-icon.svg?react';
import SocialLinks from '@components/SocialLinks/SocialLinks';
import heroData from '@data/hero.json';
import styles from './Navigation.module.scss';

const navHrefs = ['#team', '#benefits', '#withUs'];
const lang = 'en';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = heroData[lang];

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
            <button className={styles.langBtn} type="button">
              Eng
            </button>
            /
            <button className={styles.langBtnActive} type="button">
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
            <button className={styles.overlayLangBtn} type="button">
              Eng
            </button>
            /
            <button className={styles.overlayLangBtnActive} type="button">
              Рус
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
