import { z } from 'zod';

export const BenefitsResponseSchema = z.object({
  description: z.string(),
  tiles: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      benefits: z.array(z.string())
    })
  )
});

export type BenefitsResponse = z.infer<typeof BenefitsResponseSchema>;
