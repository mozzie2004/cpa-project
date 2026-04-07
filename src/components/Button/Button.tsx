import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  tabletLabel?: string;
}

const Button = ({ label, tabletLabel, ...props }: ButtonProps) => {
  return (
    <button className={styles.parallelepipedBtn} {...props}>
      <span className={clsx(tabletLabel && styles.hiddenTablet)}>{label}</span>
      {tabletLabel && <span className={styles.tabletLabel}>{tabletLabel}</span>}
    </button>
  );
};
export default Button;
