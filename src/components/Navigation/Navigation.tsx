import { useState } from 'react';
import Logo from '@assets/icons/logo.svg?react';
import CloseIcon from '@assets/icons/close-icon.svg?react';
import Instagram from '@assets/icons/instagram.svg?react';
import Telegram from '@assets/icons/telegram.svg?react';
import Linkedin from '@assets/icons/linkedin.svg?react';
import styles from './Navigation.module.scss';

const navLinks = [
  { label: 'Команда', href: '#team' },
  { label: 'Преимущества', href: '#benefits' },
  { label: 'С нами', href: '#withUs' }
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>
          <Logo />
        </a>
        <div className={styles.rightGroup}>
          <ul className={styles.links}>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.link}>
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
          Меню
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
                Главная
              </a>
            </li>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={styles.overlayLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <Instagram />
            </a>
            <a href="#" className={styles.socialLink}>
              <Telegram />
            </a>
            <a href="#" className={styles.socialLink}>
              <Linkedin />
            </a>
          </div>

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
