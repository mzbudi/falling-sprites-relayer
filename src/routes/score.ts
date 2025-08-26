import { Router } from "express";
import {
  submitScore,
  getScore,
  // submitScoreFor,
} from "../controllers/scoreController";

const router = Router();

router.post("/submit-score", submitScore);
// router.post("/submitFor", submitScoreFor);
router.get("/score/:address", getScore);

export default router;
