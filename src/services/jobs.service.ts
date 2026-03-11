// Business Logic
/*
This layer will handle:

validation
business logic
processor selection
job orchestration
webhook delivery

Your services will become the brain of the system.
*/

import { JobStatus } from "../types/jobs.js";
import { createJob, getJobById, listDeliveryAttemptsByJobId, listJobs } from "../repositories/queries/jobs.js";
import { deliveryAttempts } from "../repositories/schema.js";
import { getPipelineById } from "../repositories/queries/pipelines.js";

export async function listJobsService(
    filters?: {
        pipelineId?: string;
        status?: JobStatus;
    }
) {
    return listJobs(filters);
}

export async function getJobWithAttemptsService(id: string) {
    const job = await getJobById(id);
    if (!job) {
        throw new Error("Job not found");
    }
    const attempts = await listDeliveryAttemptsByJobId(id);
    return {
        ...job,
        deliveryAttempts: attempts
    }
}

export async function enqueueJobService({
    pipelineId,
    payload
}: { // declare the type of the function's parameter object
    pipelineId: string;
    payload: unknown;
}) {

    const pipeline = await getPipelineById(pipelineId);

    if (!pipeline) {
        throw new Error("Pipeline not found");
    }

    const job = await createJob({
        pipelineId,
        payload,
        status: "queued",
        webhookStatus: "pending"
    });

    return { jobId: job.id };
};