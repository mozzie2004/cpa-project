import Instagram from '@assets/icons/instagram.svg?react';
import Telegram from '@assets/icons/telegram.svg?react';
import Linkedin from '@assets/icons/linkedin.svg?react';
import './SocialLinks.scss';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={`socialLinks ${className || ''}`}>
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
