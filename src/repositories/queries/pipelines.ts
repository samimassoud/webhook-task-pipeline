import { eq } from "drizzle-orm";
import { db } from "../db.js";
import { NewPipeline, NewSubscription, pipelines, subscriptions } from "../schema.js";

export async function createPipeline(data: NewPipeline) {
    const [result] = await db.insert(pipelines).values(data).returning();

    return result;
}

export async function listPipelines() {
    const result = await db.select().from(pipelines);
    return result;
}

export async function getPipelineById(id: string) {
    const [result] = await db.select()
        .from(pipelines)
        .where(eq(pipelines.id, id))
    return result;
}

export async function updatePipeline(
    id: string,
    data: Partial<NewPipeline>
) {
    const [result] = await db.update(pipelines)
        .set({
            ...data,
            updatedAt: new Date()
        })
        .where(eq(pipelines.id, id))
        .returning();
    return result;
}

export async function deletePipeline(
    id: string
) {
    const [result] = await db.delete(pipelines)
        .where(eq(pipelines.id, id))
        .returning();
    return result;
}
