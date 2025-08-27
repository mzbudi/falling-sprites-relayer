import { Router } from "express";
import scoreRoutes from "./score";
import leaderboardRoutes from "./leaderboard";
import minikitRoutes from "./minikit";

const router = Router();

router.use("/score", scoreRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use("/minikit", minikitRoutes); 

export default router;
