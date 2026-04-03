import { useRef, useState, useEffect, type FC } from 'react';
import { gsap } from 'gsap';
import styles from './Dropdown.module.scss';
import clsx from 'clsx';
import AngleIcon from '@assets/icons/angle.svg?react';

export interface DropdownValue {
  id: string;
  label: string;
}

interface DropdownProps {
  value?: DropdownValue | null;
  options: DropdownValue[];
  setValue: (value?: DropdownValue | null) => void;
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
}

export const Dropdown: FC<DropdownProps> = ({
  options,
  value,
  setValue,
  placeholder,
  required,
  errorMessage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!optionsRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        optionsRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    } else {
      gsap.to(optionsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  const handleSelect = (value: DropdownValue) => {
    setValue(value);
    setIsOpen(false);
  };

  return (
    <div>
      <div
        ref={dropdownRef}
        className={clsx(styles.dropdown, isOpen && styles.dropdown_open)}
      >
        <div
          className={clsx(
            styles.dropdown__head,
            isOpen && styles.dropdown__head_open
          )}
          onClick={() => setIsOpen((state) => !state)}
        >
          <span>
            {value?.label || (
              <>
                {placeholder}
                {required && <span className={styles.dropdown__star}>*</span>}
              </>
            )}
          </span>
          <AngleIcon />
        </div>

        {isOpen && (
          <div className={styles.dropdown__options} ref={optionsRef}>
            {options.map((item) => (
              <div
                className={styles.dropdown__option}
                onClick={() => handleSelect(item)}
                key={item.id}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};
