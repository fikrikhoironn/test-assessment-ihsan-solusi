import { z } from 'zod';

const User = z.object({
  id: z.number(),
  name: z.string(),
  born_date: z.string(),
  address: z.string(),
  created_at: z.string(),
  gender: z.string(),
});

type User = z.infer<typeof User>;

export { User };