import { Router } from "express";
import {
    listJobsHandler,
    getJobHandler
} from "../handlers/jobs.handlers.js";
import { jobsRateLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.use(jobsRateLimiter);

router.route("/")
    .get(listJobsHandler);
router.route("/:id")
    .get(getJobHandler)

export default router;