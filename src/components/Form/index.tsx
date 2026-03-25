import Input from '@components/Input';
import { useState, type SubmitEventHandler } from 'react';
import styles from './Form.module.scss';
import { Dropdown, type DropdownValue } from '@components/Dropdown';
import ModalButton from '@components/ModalButton';
import { useModal } from '@hooks/useModal';

const Form = () => {
  const { openModal } = useModal();
  const [name, setName] = useState('');
  const [yourContact, setYourContact] = useState('');
  const [contactMethod, setContactMethod] = useState<
    DropdownValue | null | undefined
  >(null);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    openModal('success', {
      title: 'We have received your application!',
      message: 'We will process your request and get in touch with you'
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.form__description}>
        Fields with an asterisk (*) are mandatory
      </p>
      <div className={styles.form__inputs}>
        <Input
          className={styles.form__firstInput}
          value={name}
          setValue={setName}
          placeholder="Your Name"
        />
        <Dropdown
          value={contactMethod}
          setValue={setContactMethod}
          placeholder="Contact Method"
          options={[
            { id: 'telegram', label: 'Telegram' },
            { id: 'email', label: 'Email' },
            { id: 'linkedin', label: 'Linkedin' }
          ]}
          required
        />
        <Input
          value={yourContact}
          setValue={setYourContact}
          placeholder="Your Contact"
          required
        />
      </div>
      <ModalButton className={styles.form__btn} type="submit" label="Submit" />
    </form>
  );
};

export default Form;
