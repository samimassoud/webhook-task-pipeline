import { Router } from "express";
import {
    listJobsHandler,
    getJobHandler
} from "../handlers/jobs.handlers.js";

const router = Router();

router.route("/")
    .get(listJobsHandler);
router.route("/:id")
    .get(getJobHandler)

export default router;