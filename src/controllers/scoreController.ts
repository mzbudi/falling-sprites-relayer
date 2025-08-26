import { type Request, type Response } from "express";
import {
  getScoreContract,
  submitScoreContract,
  //   submitScoreForContract,
} from "../contract/contract";

export const submitScore = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "body");

    const { score } = req.body;

    console.log(score);

    if (!score) return res.status(400).json({ error: "Score is required" });

    const tx = await submitScoreContract(score);

    res.json({ success: true, txHash: tx.hash });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// // Relayer mode
// export const submitScoreFor = async (req: Request, res: Response) => {
//   try {
//     const { player, score } = req.body;
//     if (!player || !score)
//       return res.status(400).json({ error: "Player and score are required" });

//     const tx = await submitScoreForContract(player, score);
//     await tx.wait();

//     res.json({ success: true, txHash: tx.hash });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// Get score
export const getScore = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const score = await getScoreContract(address);
    res.json(score);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
