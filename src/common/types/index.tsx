export type Lang = 'en' | 'ru';

export interface SectionRef {
  playIn: (direction: number) => Promise<void>;
  playOut: (direction: number) => Promise<void>;
  element: HTMLElement | null;
}

export interface SectionProps {
  onRegister: (ref: SectionRef) => void;
}

export type FormPayload = {
  name?: string;
  method: 'telegram' | 'whatsapp' | 'email';
  contact: string;
};

export type FormResponse = {
  message: string;
  data?: FormPayload;
};
