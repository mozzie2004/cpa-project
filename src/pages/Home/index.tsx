import { useState } from 'react';
import Navigation from '@components/Navigation/Navigation';
import Preloader from '@components/Preloader/Preloader';
import { HeroSection } from '@features/HeroSection';
import MultiTasksSection from '@features/MultiTasksSection';
import MultiBenefitsSection from '@features/MultiBenefitsSection';
import { ScrollSystem } from '@features/ScrollSystem';
import { MultiplyWithUs } from '@features/MultiplyWithUsSection';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

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
    </>
  );
};
