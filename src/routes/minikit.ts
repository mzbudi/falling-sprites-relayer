import { Router } from "express";
import { getNonce, verifySiwe } from "../controllers/minikitController";

const router = Router();

router.get("/nonce", getNonce);
router.post("/complete-siwe", verifySiwe);

export default router;
