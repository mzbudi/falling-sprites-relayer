import { ethers } from "ethers";
import abi from "../abi/Leaderboard.json";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS!,
  abi.abi,
  wallet
);

export async function submitScoreContract(score: number) {
  const tx = await contract.submitScore(score);
  return tx.wait();
}

// export async function submitScoreForContract(player: string, score: number) {
//   const tx = await contract.submitScoreFor(player, score);
//   return tx.wait();
// }

export async function getScoreContract(address: string) {
  return contract.getScore(address);
}

// Leaderboard contract instance
export async function getLeaderboardContract() {
  const latestBlock = await provider.getBlockNumber();
  const startBlock = Math.max(latestBlock - 100_000, 0); // ambil 250k block terakhir

  const filter = contract.filters.ScoreSubmitted();
  const events = await contract.queryFilter(filter, startBlock, latestBlock);

  const scoresMap = new Map<
    string,
    { player: string; season: number; score: number }
  >();

  for (const ev of events as any[]) {
    const player = ev.args[0];
    const season = Number(ev.args[1]);
    const score = Number(ev.args[2]);

    if (!scoresMap.has(player) || score > scoresMap.get(player)!.score) {
      scoresMap.set(player, { player, season, score });
    }
  }

  const leaderboard = Array.from(scoresMap.values()).sort(
    (a, b) => b.score - a.score
  );

  leaderboard.slice(0, 50);
  return leaderboard;
}
