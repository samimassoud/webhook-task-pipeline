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

        // TO BE ADDED:
        // The pipeline has a signing secret. The client will include X-Signature: sha256=<hash>
        // We will get the signing key, the compute it for the payload (raw body) using the secret and check
        // if it doesn't equal we return Unauthorized access 401 or Forbidden 403 and we don't add the job.
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