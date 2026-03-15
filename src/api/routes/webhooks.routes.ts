import { Router } from "express";
import {
    receiveWebhookHandler
} from "../handlers/webhooks.handlers.js";
import { validateSignature } from "../middleware/validatesSignature.js";

const router = Router();

router.route("/:pipelineId")
    .post(validateSignature, receiveWebhookHandler);

export default router;