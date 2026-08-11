import dotenv from "dotenv";
import { app } from "./app";
import pino from "pino";
import { connectDB } from "./config/db";

dotenv.config();

const logger = pino();
const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});
