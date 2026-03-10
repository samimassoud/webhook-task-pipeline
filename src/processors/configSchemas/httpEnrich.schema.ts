import { z } from "zod";

export const httpEnrichConfigSchema = z.object({
    lookupField: z.string(),
    url: z.string().url()
});

export type HttpEnrichConfig = z.infer<typeof httpEnrichConfigSchema>