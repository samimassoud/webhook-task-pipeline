import { db } from "../db.js";
import { NewPipeline, pipelines } from "../schema.js";

export async function createPipeline(data: NewPipeline) {
    const result = await db.insert(pipelines).values(data).returning();

    return result[0];
}