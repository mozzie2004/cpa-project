import Button from '@components/Button/Button';
import SocialLinks from '@components/SocialLinks/SocialLinks';
import heroData from '@data/hero.json';
import snakeImg from '@assets/images/snake.webp';
import styles from './HeroSection.module.scss';

const lang = 'en';

export const HeroSection = () => {
  const t = heroData[lang];

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          {t.heading_1}
          <br />
          {t.heading_2}{' '}
          <span className={styles.accent}>{t.heading_accent}</span>
        </h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
        <Button label={t.button} />
      </div>

      <div className={styles.imageWrapper}>
        <img
          className={styles.snakeImage}
          src={snakeImg}
          alt="Snake illustration"
        />
      </div>

      <SocialLinks className={styles.socialIcons} />
    </section>
  );
};
