import Logo from '@assets/icons/logo.svg?react';
import styles from './Navigation.module.scss';

const navLinks = [
  { label: 'Команда', href: '#team' },
  { label: 'Преимущества', href: '#benefits' },
  { label: 'С нами', href: '#withUs' }
];

const Navigation = () => {
  return (
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
    </nav>
  );
};

export default Navigation;
