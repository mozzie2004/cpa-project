import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return <button className={styles.parallelepipedBtn}>{label}</button>;
};
export default Button;
