// Business Logic
import { NewPipeline, NewSubscription } from "../repositories/schema.js";
import { createPipeline, deletePipeline, getPipelineById, listPipelines, updatePipeline } from "../repositories/queries/pipelines.js";
import { processorRegistry } from "../processors/registry.js";
import { addSubscription, deleteSubscription, getSubscription, listSubscriptions } from "../repositories/queries/subscriptions.js";

export async function createPipelineService(data: NewPipeline) {
    const processor = processorRegistry[data.processorType];
    if (!processor) {
        throw new Error(`Processor ${data.processorType} is not a valid processor type`);
    }
    const parsedConfig = processor.configSchema.parse(data.config);

    return createPipeline({
        ...data, //spread data includes config as orignally passed in
        config: parsedConfig // explicitly overwrite the original config with the validated and parsed version
    }
    );
}

export async function listPipelinesService() {
    return listPipelines();
}

export async function getPipelineService(id: string) {
    return getPipelineById(id);
}

export async function updatePipelineService(id: string, data: Partial<NewPipeline>) {
    if (Object.keys(data).length === 0) {
        throw new Error("No fields provided for update");
    }
    const existing = await getPipelineById(id);
    if (!existing) {
        throw new Error("Pipeline to be updated was not found");
    }
    // We determine processor type: updated? if not then it's the existing's.
    const processorType = data.processorType ?? existing.processorType;
    const processor = processorRegistry[processorType];
    if (!processor) {
        throw new Error(`Processor ${data.processorType} is not a valid processor type`);
    }
    if (data.config) {
        const parsedConfig = processor.configSchema.parse(data.config);
        data.config = parsedConfig;
    } // If only pipeline's config was updated it's validated against the existing processor type.
    // If both processor type and its config were updated, it's validated against the new processor's type.

    return updatePipeline(id, data);
}

export async function deletePipelineService(id: string) {
    const existing = await getPipelineById(id);

    if (!existing) {
        throw new Error("Pipeline not found");
    }

    // Later to consider adding;
    // I can prevent pipeline's deletion if it has jobs
    // and expose admin api endpoint to delete anyway.

    return deletePipeline(id);
}


export async function listSubscriptionsService(id: string) {
    return listSubscriptions(id);
}

export async function addSubscriptionService(
    data: NewSubscription
) {
    return addSubscription(data);
}

export async function deleteSubscriptionService(id: string, subId: string) {
    const existing = await getSubscription(subId);

    if (!existing) {
        throw new Error("Subscription not found");
    }
    return deleteSubscription(id, subId);
}