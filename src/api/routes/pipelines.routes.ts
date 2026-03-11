import { Router } from "express";
import {
    createPipelineHandler,
    listPipelinesHandler,
    getPipelineHandler,
    updatePipelineHandler,
    deletePipelineHandler,
} from "../handlers/pipelines.handlers.js";

const router = Router();

router.route("/")
    .post(createPipelineHandler)
    .get(listPipelinesHandler);

router.route("/:id")
    .get(getPipelineHandler)
    .patch(updatePipelineHandler)
    .delete(deletePipelineHandler);

export default router;