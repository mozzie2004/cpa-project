export type ModalKey = 'form' | 'success';

export type ModalRegistry = {
  form: Record<string, unknown>;
  success: Record<string, unknown>;
};

export type ModalContextType = {
  openModal: <K extends ModalKey>(key: K, props: ModalRegistry[K]) => void;
  closeModal: () => void;
};
