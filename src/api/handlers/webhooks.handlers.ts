import { Request, Response } from "express";
import { enqueueJobService } from "../../services/jobs.service.js";
// Handlers parse request and call services
export async function receiveWebhookHandler(
    req: Request,
    res: Response
) {
    try {
        const pipelineId = req.params.pipelineId as string;
        if (!pipelineId) {
            return res.status(400).json({ error: "Pipeline ID is required" });
        }

        const payload = req.body;
        const { jobId } = await enqueueJobService({
            pipelineId,
            payload
        });

        res.status(202).json({ jobId })

    } catch (err) {
        res.status(404).json({ error: (err as Error).message });
    }
}