export type ModalKey = 'form' | 'info';

export type ModalRegistry = {
  form: Record<string, unknown>;
  info: Record<string, unknown>;
};

export type ModalContextType = {
  openModal: <K extends ModalKey>(key: K, props: ModalRegistry[K]) => void;
  closeModal: () => void;
};
