import Button from '@components/Button/Button';
import SocialLinks from '@components/SocialLinks/SocialLinks';
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

      <SocialLinks className={styles.socialIcons} />
    </section>
  );
};
