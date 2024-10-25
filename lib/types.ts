import * as z from 'zod';

export type ItemType = 'flight' | 'accommodation' | 'activity';
export type ItemStatus = 'upcoming' | 'in-progress' | 'completed';

export const itemSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['flight', 'accommodation', 'activity']),
  description: z.string().min(1, 'Description is required'),
  date: z.date({
    required_error: 'Date is required',
  }),
  time: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.number().optional(),
  location: z
    .object({
      address: z.string(),
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
  notes: z.string().optional(),
  status: z.enum(['upcoming', 'in-progress', 'completed']).optional(),
  dependencies: z.array(z.string()).optional(),
});

export type TripItem = z.infer<typeof itemSchema>;