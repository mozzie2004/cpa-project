import Button from '@components/Button/Button';
import Instagram from '@assets/icons/instagram.svg?react';
import Telegram from '@assets/icons/telegram.svg?react';
import Linkedin from '@assets/icons/linkedin.svg?react';
import snakeImg from '@assets/images/snake.webp';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Practice
          <br />
          makes <span className={styles.accent}>profit</span>
        </h1>
        <p className={styles.subtitle}>
          Предлагаем эффективные решения, которые <br />
          уже протестили на своих продуктах и бюджетах
        </p>
        <Button label="Получить профит" />
      </div>

      <div className={styles.imageWrapper}>
        <img
          className={styles.snakeImage}
          src={snakeImg}
          alt="Snake illustration"
        />
      </div>

      <div className={styles.socialIcons}>
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
    </section>
  );
};
