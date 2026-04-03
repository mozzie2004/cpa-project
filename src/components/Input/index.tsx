import type { FC, HTMLInputTypeAttribute } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  name?: string;
}

const Input: FC<InputProps> = ({
  name,
  value,
  setValue,
  required,
  type,
  placeholder,
  className,
  errorMessage
}) => {
  return (
    <div className={className}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          value={value}
          required={required}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          name={name}
        />
        {placeholder && !value && (
          <span className={styles.placeholder}>
            {placeholder}
            {required && <span className={styles.placeholder__star}>*</span>}
          </span>
        )}
      </div>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
