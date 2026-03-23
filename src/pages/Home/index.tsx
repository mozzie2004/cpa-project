import Navigation from '@components/Navigation/Navigation';
import { HeroSection } from '@features/HeroSection';
import MultiTasksSection from '@features/MultiTasksSection';
import MultiBenefitsSection from '@features/MultiBenefitsSection';
import { ScrollSystem } from '@features/ScrollSystem';
import { MultiplyWithUs } from '@features/MultiplyWithUsSection';

export const HomePage = () => {
  return (
    <>
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
