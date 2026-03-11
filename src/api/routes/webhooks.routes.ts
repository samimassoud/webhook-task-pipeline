import { Router } from "express";
import {
    receiveWebhookHandler
} from "../handlers/webhooks.handlers.js";

const router = Router();

router.route("/:pipelineId")
    .post(receiveWebhookHandler);

export default router;