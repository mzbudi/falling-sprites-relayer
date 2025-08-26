import { type Request, type Response } from "express";
import { getLeaderboardContract } from "../contract/contract";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await getLeaderboardContract();

    res.json({ success: true, leaderboard });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
