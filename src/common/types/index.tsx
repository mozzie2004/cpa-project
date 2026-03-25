export type Lang = 'en' | 'ru';

export interface SectionRef {
  playIn: (direction: number) => Promise<void>;
  playOut: (direction: number) => Promise<void>;
  element: HTMLElement | null;
}

export interface SectionProps {
  onRegister: (ref: SectionRef) => void;
}
