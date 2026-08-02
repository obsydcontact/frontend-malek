import { z } from 'zod';

export const newsletterFormSchema = z.object({
  email: z.string().trim().email(),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
