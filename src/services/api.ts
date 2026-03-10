import type {
  Lang,
  BenefitsResponse,
  MultiplyResponse,
  TasksResponse
} from '@common/types';

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

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${currentLang}/${endpoint}`, {
    headers
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getBenefits: () => request<BenefitsResponse>('benefits'),
  getMultiply: () => request<MultiplyResponse>('multiply'),
  getTasks: () => request<TasksResponse>('tasks')
};
