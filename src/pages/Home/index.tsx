import Navigation from '@components/Navigation/Navigation';
import { HeroSection } from '@features/HeroSection';
import MultiTasksSection from '@features/MultiTasksSection';
import { ScrollSystem } from '@features/ScrollSystem';

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <ScrollSystem sections={[HeroSection, MultiTasksSection]} />
    </>
  );
};
