import { describe, it, expect } from 'vitest';
import { MultiplyResponseSchema } from './multiply';

describe('MultiplyResponseSchema', () => {
  it('should pass with valid data', () => {
    const data = [
      {
        title: 'Example',
        steps: {
          step_1: 'First step',
          step_2: 'Second step'
        }
      }
    ];

    expect(MultiplyResponseSchema.safeParse(data).success).toBe(true);
  });

  it('should fail if root is not an array', () => {
    const data = {
      title: 'Example',
      steps: {
        step_1: 'First',
        step_2: 'Second'
      }
    };

    expect(() => MultiplyResponseSchema.parse(data)).toThrow();
  });

  it('should fail if item has wrong shape', () => {
    const data = [
      {
        title: 'Example'
      }
    ];

    expect(() => MultiplyResponseSchema.parse(data)).toThrow();
  });

  it('should fail if steps is not an object', () => {
    const data = [
      {
        title: 'Example',
        steps: 'not-object'
      }
    ];

    expect(() => MultiplyResponseSchema.parse(data)).toThrow();
  });

  it('should fail if step_2 is missing', () => {
    const data = [
      {
        title: 'Example',
        steps: {
          step_1: 'First step'
        }
      }
    ];

    expect(() => MultiplyResponseSchema.parse(data)).toThrow();
  });

  it('should fail if step_1 is not a string', () => {
    const data = [
      {
        title: 'Example',
        steps: {
          step_1: 123,
          step_2: 'Second step'
        }
      }
    ];

    expect(() => MultiplyResponseSchema.parse(data)).toThrow();
  });
});
