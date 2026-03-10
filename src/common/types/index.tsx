export type Lang = 'en' | 'ru';

export type BenefitsResponse = {
  title: string;
  description: string;
  benefits: string[];
};

export type MultiplyResponse = {
  title: string;
  steps: {
    step_1: string;
    step_2: string;
  };
}[];

export type TasksResponse = {
  description: string;
  tiles: {
    title: string;
    text: string;
  }[];
};
