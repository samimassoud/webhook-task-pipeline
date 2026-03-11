import { and, eq } from "drizzle-orm";
import { db } from "../db.js";
import { NewSubscription, subscriptions } from "../schema.js";

export async function addSubscription(data: NewSubscription) {
    const [result] = await db.insert(subscriptions).values(data).returning();
    return result;
}
export async function listSubscriptions(id: string) {
    const result = await db.select().from(subscriptions);
    return result;
}
export async function getSubscription(id: string) {
    const [result] = await db.select()
        .from(subscriptions)
        .where(eq(subscriptions.id, id));
    return result;
}
export async function deleteSubscription(id: string, subId: string) {
    const [result] = await db.delete(subscriptions)
        .where(and(
            eq(subscriptions.id, subId),
            eq(subscriptions.pipelineId, id)
        ))
        .returning();
    return result;
}