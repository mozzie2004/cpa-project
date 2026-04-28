import type { Lang } from '@common/types';

export const AppRoute = {
  ROOT: '/',
  ANY: '*'
} as const;

export const LOCALES: Lang[] = ['en', 'ru'];
export const DEFAULT_LOCALE: Lang = 'en';
