import { MultiplyBenefits } from '@features/MultiplyBenefits';
import { MultiplyWithUs } from '@features/MultiplyWithUs';
import { ScrollSystem } from '@features/ScrollSystem';

export const HomePage = () => {
  return <ScrollSystem sections={[MultiplyBenefits, MultiplyWithUs]} />;
};
