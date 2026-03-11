// Handlers parse request and call services

import { Request, Response } from "express";
import { listJobsService, getJobWithAttemptsService } from "../../services/jobs.service.js";
import { JobStatus } from "../../types/jobs.js";

export async function listJobsHandler(
    req: Request,
    res: Response
) {
    const { pipelineId, status } = req.query;

    const jobs = await listJobsService({
        pipelineId: pipelineId as string | undefined,
        status: status as JobStatus | undefined
    });
    res.status(200).json(jobs);
}

export async function getJobHandler(
    req: Request,
    res: Response
) {
    try {
        const id = req.params.id as string;
        if (!id) {
            return res.status(400).json({ error: "Job ID is required" });
        }
        const job = await getJobWithAttemptsService(id);
        res.status(200).json(job);
    } catch (err) {
        res.status(404).json({ error: (err as Error).message });
    }
}