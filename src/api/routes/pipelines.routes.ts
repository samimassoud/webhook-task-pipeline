import { Router } from "express";
import {
    createPipeline,
    listPipelines,
    deletePipeline
} from "../handlers/pipelines.handlers.js";

const router = Router();

router.post("/", createPipeline);
router.get("/", listPipelines);
router.delete("/:id", deletePipeline);

export default router;