import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { healthRoutes } from "./routes/health.routes";

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(pinoHttp());

// Routes
app.use("/api/v1", healthRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

export { app };
