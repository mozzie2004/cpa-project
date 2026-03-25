import { z } from 'zod';

export const TasksResponseSchema = z.object({
  description: z.string(),
  tiles: z.array(
    z.object({
      title: z.string(),
      text: z.string()
    })
  )
});
