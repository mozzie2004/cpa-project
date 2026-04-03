import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './index';

vi.mock('gsap', () => ({
  gsap: {
    fromTo: vi.fn(),
    to: vi.fn()
  }
}));

vi.mock('@assets/icons/angle.svg?react', () => ({
  default: () => <svg data-testid="angle-icon" />
}));

const openModal = vi.fn();

vi.mock('@hooks/useModal', () => ({
  useModal: () => ({ openModal, closeModal: vi.fn() })
}));

const postForm = vi.fn();

vi.mock('@services/api', () => ({
  api: {
    postForm: (...args: unknown[]) => postForm(...args)
  }
}));

beforeEach(() => {
  vi.clearAllMocks();
});

function getInput(name: string) {
  return screen
    .getAllByRole('textbox')
    .find((el) => el.getAttribute('name') === name)!;
}

describe('Form', () => {
  it('renders all fields and submit button', () => {
    render(<Form />);

    expect(screen.getByText('Your Name')).toBeDefined();
    expect(screen.getByText(/Contact Method/)).toBeDefined();
    expect(screen.getByText(/Your Contact/)).toBeDefined();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined();
  });

  it('shows validation errors on empty submit', async () => {
    render(<Form />);

    // Use fireEvent.submit to bypass native HTML required validation
    // so that the Zod validation in handleSubmit runs
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getAllByText('This field is required')).toHaveLength(2);
    });
    expect(postForm).not.toHaveBeenCalled();
  });

  it('submits form and opens success modal', async () => {
    postForm.mockResolvedValueOnce({ message: 'OK' });
    const user = userEvent.setup();
    render(<Form />);

    await user.type(getInput('name'), 'John');

    await user.click(screen.getByText(/Contact Method/));
    await user.click(screen.getByText('Telegram'));

    await user.type(getInput('contact'), '@john');

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(postForm).toHaveBeenCalledWith({
        name: 'John',
        method: 'telegram',
        contact: '@john'
      });
    });
    expect(openModal).toHaveBeenCalledWith('info', {
      title: 'We have received your application!',
      message: 'We will process your request and get in touch with you'
    });
  });

  it('opens error modal when API fails', async () => {
    postForm.mockRejectedValueOnce(new Error('Server error'));
    const user = userEvent.setup();
    render(<Form />);

    await user.click(screen.getByText(/Contact Method/));
    await user.click(screen.getByText('Telegram'));

    await user.type(getInput('contact'), '@john');

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(openModal).toHaveBeenCalledWith('info', {
        title: 'Error',
        message: 'Server error'
      });
    });
  });
});
