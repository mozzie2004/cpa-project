import { Link, useNavigate } from 'react-router';
import styles from './NotFound.module.scss';
import Logo from '@assets/icons/logo.svg?react';
import Button from '@components/Button/Button';
import snakeImg from '@assets/images/snake.webp';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <Link to="/" className={styles.notFound__logo}>
        <Logo />
      </Link>
      <div className={styles.notFound__content}>
        <h1 className={styles.notFound__title}>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h1>
        <Button
          onClick={() => navigate('/')}
          label="Oops, take me back"
          tabletLabel="take me back"
        />
      </div>
      <img src={snakeImg} alt="Snake" className={styles.notFound__snake} />
    </div>
  );
};

export default NotFoundPage;
