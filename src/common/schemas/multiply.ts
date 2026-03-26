import { z } from 'zod';

export const MultiplyResponseSchema = z.array(
  z.object({
    title: z.string(),
    steps: z.object({
      step_1: z.string(),
      step_2: z.string()
    })
  })
);

export type MultiplyResponse = z.infer<typeof MultiplyResponseSchema>;
