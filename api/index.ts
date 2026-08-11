import { Request, Response } from 'express';
import { app } from '../apps/api/src/app';
import { connectDB } from '../apps/api/src/config/db';
import { seedSupervisorProfile } from '../apps/api/src/scripts/seedSupervisor';

export default async function handler(req: Request, res: Response) {
  await connectDB();
  try {
    await seedSupervisorProfile();
  } catch (err) {
    // Ignore error if database is unconfigured during initial check
  }
  return app(req, res);
}
