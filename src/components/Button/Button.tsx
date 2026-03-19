import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button className={styles.parallelepipedBtn} {...props}>
      {label}
    </button>
  );
};
export default Button;
