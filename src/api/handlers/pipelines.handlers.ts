// Handlers parse request and call services
import { Request, Response } from "express";
import { createPipelineService } from "../../services/pipelines.service.js";

export async function createPipeline(req: Request, res: Response) {
    const pipeline = await createPipelineService(req.body);

    res.status(201).json(pipeline);
}