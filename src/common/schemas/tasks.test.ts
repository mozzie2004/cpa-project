import { describe, it, expect } from 'vitest';
import { TasksResponseSchema } from './tasks';

describe('TasksResponseSchema', () => {
  it('should pass with valid data', () => {
    const data = {
      description: 'Some description',
      tiles: [
        { title: 'Tile 1', text: 'Text 1' },
        { title: 'Tile 2', text: 'Text 2' }
      ]
    };

    expect(TasksResponseSchema.safeParse(data).success).toBe(true);
  });

  it('should fail if required field is missing', () => {
    const data = {
      tiles: []
    };

    expect(() => TasksResponseSchema.parse(data)).toThrow();
  });

  it('should fail if tiles is not an array', () => {
    const data = {
      description: 'Some description',
      tiles: 'not-array'
    };

    expect(() => TasksResponseSchema.parse(data)).toThrow();
  });

  it('should fail if tile has wrong shape', () => {
    const data = {
      description: 'Some description',
      tiles: [{ title: 'Tile 1' }]
    };

    expect(() => TasksResponseSchema.parse(data)).toThrow();
  });

  it('should fail if tile fields have wrong types', () => {
    const data = {
      description: 'Some description',
      tiles: [{ title: 'Tile 1', text: 123 }]
    };

    expect(() => TasksResponseSchema.parse(data)).toThrow();
  });
});
