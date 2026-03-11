import { z } from "zod";

export const createPipelineSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
});

export const updatePipelineSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
});

export type CreatePipelineInput = z.infer<typeof createPipelineSchema>;
export type UpdatePipelineInput = z.infer<typeof updatePipelineSchema>;