// Vercel serverless function: /api/tawk-hash
import crypto from "crypto";

export default function handler(req, res) {
  // For GET ?email=...  (works for POST too if you prefer)
  const { email = "" } = req.query || {};
  const secret = process.env.TAWK_SECRET;

  if (!email || !secret) {
    res.status(400).json({ error: "Missing email or server secret" });
    return;
  }

  // Optional CORS for cross-origin testing (CodePen/JSFiddle)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const hash = crypto.createHmac("sha256", secret).update(email).digest("hex");
  res.status(200).json({ hash });
}
