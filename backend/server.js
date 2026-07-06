import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRouter from "./routes/analyze.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "x-user-id"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api", analyzeRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "AI Investment Research Server is online" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Stream API: http://localhost:${PORT}/api/analyze/stream`);
  console.log(`Standard API: http://localhost:${PORT}/api/analyze`);
});
