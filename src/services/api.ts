import type { Lang } from '@common/types';
import { TasksResponseSchema } from '@common/schemas/tasks';
import { BenefitsResponseSchema } from '@common/schemas/benefits';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers: HeadersInit = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json'
};

let currentLang: Lang = 'en';

export const setApiLang = (lang: Lang) => {
  currentLang = lang;
};

async function request(endpoint: string): Promise<unknown> {
  const response = await fetch(`${BASE_URL}/${currentLang}/${endpoint}`, {
    headers
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getTasks: async () => {
    const data = await request('tasks');
    return TasksResponseSchema.parse(data);
  },

  getBenefits: async () => {
    const data = await request('benefits');
    return BenefitsResponseSchema.parse(data);
  }
};
