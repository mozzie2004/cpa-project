import type { FC, ReactNode } from 'react';
import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle: FC<SectionTitleProps> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default SectionTitle;
