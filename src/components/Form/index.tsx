import Input from '@components/Input';
import { useState, type SubmitEventHandler } from 'react';
import { z } from 'zod';
import styles from './Form.module.scss';
import { Dropdown, type DropdownValue } from '@components/Dropdown';
import ModalButton from '@components/ModalButton';
import { useModal } from '@hooks/useModal';
import { formSchema } from './formSchema';
import { api } from '@services/api';
import type { FormPayload } from '@common/types';

type FormKey = keyof FormPayload;
type FormInputKey = Exclude<FormKey, 'method'>;

type Field = Record<FormInputKey, string> & {
  method?: DropdownValue | null;
};

const Form = () => {
  const { openModal } = useModal();
  const [fields, setFields] = useState<Field>({
    name: '',
    contact: '',
    method: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormPayload, { errors: string[] }>>
  >({});
  const [validate, setValidate] = useState(false);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    setFormErrors({});
    setValidate(true);

    const validatingResults = formSchema.safeParse({
      ...fields,
      method: fields.method?.id
    });

    if (!validatingResults.success) {
      const tree = z.treeifyError(validatingResults.error);
      setFormErrors({ ...(tree.properties || {}) });
      return;
    }

    try {
      setIsLoading(true);
      await api.postForm(validatingResults.data);
      openModal('info', {
        title: 'We have received your application!',
        message: 'We will process your request and get in touch with you'
      });
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err) {
        openModal('info', { title: 'Error', message: err.message });
      } else {
        openModal('info', {
          title: 'Error',
          message: 'Something went wrong. Please try again later'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFields = ({
    name,
    value
  }:
    | { name: FormInputKey; value: string }
    | { name: 'method'; value: DropdownValue | null | undefined }) => {
    if (validate) {
      const schema = formSchema.shape[name];
      const validatingValue = name === 'method' ? value?.id : value;
      const validatingResults = schema.safeParse(validatingValue);
      console.log(formErrors);

      setFormErrors((state) => ({
        ...state,
        [name]: validatingResults?.error
          ? {
              errors: z.treeifyError(validatingResults.error).errors
            }
          : []
      }));
    }
    setFields((state) => ({ ...state, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.form__description}>
        Fields with an asterisk (*) are mandatory
      </p>
      <div className={styles.form__inputs}>
        <Input
          className={styles.form__firstInput}
          value={fields.name}
          setValue={(value) => handleChangeFields({ name: 'name', value })}
          placeholder="Your Name"
          name="name"
          errorMessage={formErrors.name?.errors?.[0]}
        />
        <Dropdown
          value={fields.method}
          setValue={(value) => handleChangeFields({ name: 'method', value })}
          placeholder="Contact Method"
          errorMessage={formErrors.method?.errors?.[0]}
          options={[
            { id: 'telegram', label: 'Telegram' },
            { id: 'whatsapp', label: 'Whatsapp' },
            { id: 'email', label: 'Email' }
          ]}
          required
        />
        <Input
          value={fields.contact}
          setValue={(value) => handleChangeFields({ name: 'contact', value })}
          placeholder="Your Contact"
          name="contact"
          errorMessage={formErrors.contact?.errors?.[0]}
          required
        />
      </div>
      <ModalButton
        disabled={isLoading}
        className={styles.form__btn}
        type="submit"
        label="Submit"
      />
    </form>
  );
};

export default Form;
