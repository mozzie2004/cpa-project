import Navigation from '@components/Navigation/Navigation';
import { HeroSection } from '@features/HeroSection';
import MultiTasksSection from '@features/MultiTasksSection';
import MultiBenefitsSection from '@features/MultiBenefitsSection';
import { ScrollSystem } from '@features/ScrollSystem';

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <ScrollSystem
        sections={[HeroSection, MultiTasksSection, MultiBenefitsSection]}
      />
    </>
  );
};
