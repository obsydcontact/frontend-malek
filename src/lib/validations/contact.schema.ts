import { z } from 'zod';

/**
 * Mirrors backend/src/schemas/lead.schema.ts field-for-field (minus
 * server-only fields like clientIp) so the same shape survives the trip
 * from the RHF form to the backend API. See docs/03-architecture.md.
 */
export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .min(4)
    .max(30)
    .optional()
    .or(z.literal('')),
  goal: z.enum([
    'weight_loss',
    'muscle_building',
    'body_recomposition',
    'online_coaching',
    'personal_training',
    'nutrition_coaching',
    'other',
  ]),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
