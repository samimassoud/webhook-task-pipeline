import { z } from "zod";

export const addSubscriptionSchema = z.object({
    pipelineId: z.string().uuid(), // or just z.string() if not UUID
    callbackUrl: z.string().url(),
    id: z.string().optional(),
    createdAt: z.date().optional(),
});

// Infer the TypeScript type from the schema
export type NewSubscription = z.infer<typeof addSubscriptionSchema>;