// server.js
// This is the entry point. It wires everything together:
// middleware -> routes -> (routes call controllers -> controllers call db.js)

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import expenseRoutes from "./routes/expenseRoutes.js";
import lendingRoutes from "./routes/lendingRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Security & core middleware ---

// Only allow requests from your own frontend's origin, not any website.
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);

// Parse incoming JSON bodies (so req.body works in controllers).
// Limit size to prevent abuse via huge payloads.
app.use(express.json({ limit: "100kb" }));

// Basic rate limiting: max 100 requests per 15 min per IP.
// Protects against brute-force / abuse on a small app.
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/", limiter);

// --- Routes ---
app.use("/api/expenses", expenseRoutes);
app.use("/api/lendings", lendingRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// --- Centralized error handler (catches anything thrown in controllers) ---
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
