import { useState } from 'react';
import Navigation from '@components/Navigation/Navigation';
import Preloader from '@components/Preloader/Preloader';
import { HeroSection } from '@features/HeroSection';
import MultiTasksSection from '@features/MultiTasksSection';
import MultiBenefitsSection from '@features/MultiBenefitsSection';
import { ScrollSystem } from '@features/ScrollSystem';
import { MultiplyWithUs } from '@features/MultiplyWithUsSection';
import { Navigate, useParams } from 'react-router';
import { LOCALES, DEFAULT_LOCALE } from '@common/constants';
import type { Lang } from '@common/types';
import SectionBg from '@components/SectionBg';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { locale } = useParams();

  if (locale === DEFAULT_LOCALE) {
    return <Navigate to={'/'} />;
  }

  if (locale && !LOCALES.includes(locale as Lang)) {
    return <Navigate to={'/en/not-found'} />;
  }

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navigation />
      <ScrollSystem
        sections={[
          HeroSection,
          MultiTasksSection,
          MultiBenefitsSection,
          MultiplyWithUs
        ]}
      />
      <SectionBg />
    </>
  );
};
