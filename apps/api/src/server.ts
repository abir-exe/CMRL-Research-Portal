import dotenv from "dotenv";
import { app } from "./app";
import pino from "pino";
import { connectDB } from "./config/db";
import { seedSupervisorProfile } from "./scripts/seedSupervisor";

dotenv.config();

const logger = pino();
const PORT = process.env.PORT || 3001;

connectDB().then(async () => {
  try {
    await seedSupervisorProfile();
  } catch (err) {
    logger.error({ err }, "Failed to seed supervisor profile");
  }
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});
