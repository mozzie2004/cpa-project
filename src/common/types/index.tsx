export type Lang = 'en' | 'ru';

export type MultiplyResponse = {
  title: string;
  steps: {
    step_1: string;
    step_2: string;
  };
}[];

export interface SectionRef {
  playIn: (direction: number) => Promise<void>;
  playOut: (direction: number) => Promise<void>;
  element: HTMLElement | null;
}

export interface SectionProps {
  onRegister: (ref: SectionRef) => void;
}
