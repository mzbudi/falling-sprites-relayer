import { type Request, type Response } from "express";
import crypto from "crypto";
import { verifySiweMessage } from "@worldcoin/minikit-js";

const nonces = new Map();

export const getNonce = async (req: Request, res: Response) => {
  try {
    const nonce = crypto.randomBytes(16).toString("hex");
    nonces.set(nonce, true);
    res.json({ nonce });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const verifySiwe = async (req: Request, res: Response) => {
  const { payload, nonce } = req.body;

  // cek nonce valid
  if (!nonces.has(nonce)) {
    return res.status(400).json({ error: "Invalid nonce" });
  }
  nonces.delete(nonce); // habis dipakai, hapus

  try {
    // verifikasi payload dari MiniKit
    const verified = await verifySiweMessage(payload, nonce);

    if (!verified.isValid) {
      return res.status(401).json({ error: "Verification failed" });
    }

    // user sudah terverifikasi ✅
    return res.status(200).json({
      success: true,
      isValid: verified.isValid,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
