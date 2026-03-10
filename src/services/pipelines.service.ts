// Business Logic
import { NewPipeline } from "src/repositories/schema.js";
import { createPipeline } from "../repositories/pipelines/createPipeline.js";

export async function createPipelineService(data: NewPipeline) {
    return createPipeline(data);
}