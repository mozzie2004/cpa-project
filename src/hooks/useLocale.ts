import { DEFAULT_LOCALE, LOCALES } from '@common/constants';
import type { Lang } from '@common/types';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export const useLocale = () => {
  const { locale } = useParams();
  const navigate = useNavigate();

  const currentLocale =
    locale && LOCALES.includes(locale as Lang)
      ? (locale as Lang)
      : DEFAULT_LOCALE;

  useEffect(() => {
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);

  const setLocale = (locale: Lang = DEFAULT_LOCALE) => {
    const hash = window.location.hash;
    if (locale === DEFAULT_LOCALE) {
      return navigate(`/${hash}`);
    }

    if (!LOCALES.includes(locale)) {
      return navigate(`/${DEFAULT_LOCALE}${hash}`);
    }

    navigate(`/${locale}${hash}`);
  };

  return { locale: currentLocale, setLocale };
};
