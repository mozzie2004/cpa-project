import { describe, it, expect } from 'vitest';
import { BenefitsResponseSchema } from './benefits';

describe('BenefitsResponseSchema', () => {
  it('should pass with valid data', () => {
    const data = {
      title: 'Title',
      description: 'Description',
      benefits: ['Benefit 1', 'Benefit 2']
    };

    expect(BenefitsResponseSchema.safeParse(data).success).toBe(true);
  });

  it('should fail if required field is missing', () => {
    const data = {
      title: 'Title',
      benefits: ['Benefit 1']
    };

    expect(() => BenefitsResponseSchema.parse(data)).toThrow();
  });

  it('should fail if benefits is not an array', () => {
    const data = {
      title: 'Title',
      description: 'Description',
      benefits: 'not-array'
    };

    expect(() => BenefitsResponseSchema.parse(data)).toThrow();
  });

  it('should fail if benefits contains non-string', () => {
    const data = {
      title: 'Title',
      description: 'Description',
      benefits: ['ok', 123]
    };

    expect(() => BenefitsResponseSchema.parse(data)).toThrow();
  });
});
