// Handlers parse request and call services
import { Request, Response } from "express";
import { createPipelineService, deletePipelineService, getPipelineService, listPipelinesService, updatePipelineService } from "../../services/pipelines.service.js";

export async function createPipelineHandler(req: Request, res: Response) {
    try {
        const pipeline = await createPipelineService(req.body);

        res.status(201).json(pipeline);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
}

export async function listPipelinesHandler(req: Request, res: Response) {
    const pipelines = await listPipelinesService();

    res.status(200).json(pipelines);
}


export async function getPipelineHandler(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        if (!id) {
            return res.status(400).json({ error: "Pipeline ID is required" });
        }
        const pipeline = await getPipelineService(id);
        res.status(200).json(pipeline);
    } catch (err) {
        res.status(404).json({ error: (err as Error).message });
    }


}

export async function updatePipelineHandler(req: Request, res: Response) {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).json({ error: "Pipeline ID is required" });
        }

        const pipeline = await updatePipelineService(id, req.body);
        res.status(200).json(pipeline);

    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
}

export async function deletePipelineHandler(req: Request, res: Response) {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).json({ error: "Pipeline ID is required" });
        }

        await deletePipelineService(id);
        res.status(204).send();

    } catch (err) {
        res.status(404).json({ error: (err as Error).message });
    }
}