import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { healthRoutes } from "./routes/health.routes";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { adminRouter } from "./routes/admin.routes";
import { notificationRouter } from "./routes/notification.routes";

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(pinoHttp());

// Routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/notifications", notificationRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

export { app };
