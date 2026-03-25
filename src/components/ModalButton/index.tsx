import clsx from 'clsx';
import styles from './ModalButton.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const ModalButton = ({ label, className, ...props }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {label}
    </button>
  );
};
export default ModalButton;
