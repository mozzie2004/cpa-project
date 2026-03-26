import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().optional(),
  method: z.enum(['telegram', 'whatsapp', 'email'], 'This field is required'),
  contact: z.string().trim().nonempty('This field is required')
});
