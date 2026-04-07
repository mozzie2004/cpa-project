import type { FC, ReactNode } from 'react';
import styles from './Tab.module.scss';
import clsx from 'clsx';
import ArrowIcon from '@assets/icons/arrow.svg?react';

interface TabProps {
  children: ReactNode;
  isActive?: boolean;
  onClick: (value: number) => void;
  value: number;
}

const Tab: FC<TabProps> = ({ children, isActive, onClick, value }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={clsx(styles.tab, isActive && styles.tab_active)}
    >
      {children}
      <ArrowIcon />
    </button>
  );
};

export default Tab;
