import type { FC, HTMLInputTypeAttribute } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
}

const Input: FC<InputProps> = ({
  value,
  setValue,
  required,
  type,
  placeholder,
  className
}) => {
  return (
    <div className={clsx(styles.inputWrapper, className)}>
      <input
        className={styles.input}
        value={value}
        required={required}
        onChange={(e) => setValue(e.target.value)}
        type={type}
      />
      {placeholder && !value && (
        <span className={styles.placeholder}>
          {placeholder}
          {required && <span className={styles.placeholder__star}>*</span>}
        </span>
      )}
    </div>
  );
};

export default Input;
