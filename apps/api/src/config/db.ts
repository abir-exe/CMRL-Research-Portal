import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino({ name: 'db' });

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    logger.warn('MONGODB_URI is not defined. Skipping live database connection in unconfigured environment.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    logger.info('Successfully connected to MongoDB database.');
  } catch (error) {
    logger.error({ err: error }, 'Failed to connect to MongoDB database.');
  }
}
