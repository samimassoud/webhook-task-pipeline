import { Router } from "express";
import {
    createPipelineHandler,
    listPipelinesHandler,
    getPipelineHandler,
    updatePipelineHandler,
    deletePipelineHandler,
    addSubscriptionHandler,
    listSubscriptionsHandler,
    deleteSubscriptionHandler,
} from "../handlers/pipelines.handlers.js";

const router = Router();

router.route("/")
    .post(createPipelineHandler)
    .get(listPipelinesHandler);

router.route("/:id")
    .get(getPipelineHandler)
    .patch(updatePipelineHandler)
    .delete(deletePipelineHandler);

router.route("/:id/subscriptions")
    .post(addSubscriptionHandler)
    .get(listSubscriptionsHandler);

router.route("/:id/subscriptions/:subId")
    .delete(deleteSubscriptionHandler);

export default router;