import { Router } from "express";
import scoreRoutes from "./score";
import leaderboardRoutes from "./leaderboard";

const router = Router();

router.use("/score", scoreRoutes);
router.use("/leaderboard", leaderboardRoutes);

export default router;
