import type { FC } from 'react';
import styles from './SuccessMessage.module.scss';
import ModalButton from '@components/ModalButton';

interface SuccessMessageProps {
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessMessage: FC<SuccessMessageProps> = ({
  title,
  message,
  onClose
}) => {
  return (
    <div className={styles.message}>
      <p className={styles.message__title}>{title}</p>
      <p className={styles.message__subtitle}>{message}</p>
      <ModalButton
        className={styles.message__btn}
        type="button"
        onClick={onClose}
        label="Done"
      />
    </div>
  );
};

export default SuccessMessage;
