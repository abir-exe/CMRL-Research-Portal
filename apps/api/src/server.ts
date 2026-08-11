import dotenv from "dotenv";
import { app } from "./app";
import pino from "pino";

dotenv.config();

const logger = pino();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
