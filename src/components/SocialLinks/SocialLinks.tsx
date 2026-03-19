import clsx from 'clsx';
import Instagram from '@assets/icons/instagram.svg?react';
import Telegram from '@assets/icons/telegram.svg?react';
import Linkedin from '@assets/icons/linkedin.svg?react';
import styles from './SocialLinks.module.scss';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={clsx(styles.socialLinks, className)}>
      <a href="#">
        <Instagram />
      </a>
      <a href="#">
        <Telegram />
      </a>
      <a href="#">
        <Linkedin />
      </a>
    </div>
  );
};

export default SocialLinks;
