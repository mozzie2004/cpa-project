import Navigation from '@components/Navigation/Navigation';
import { HeroSection } from '@features/HeroSection';
import MultiTasksSection from '@features/MultiTasksSection';

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <MultiTasksSection />
    </>
  );
};
