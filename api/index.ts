import { Request, Response } from 'express';
import { app } from '../apps/api/src/app';
import { connectDB } from '../apps/api/src/config/db';
import { seedSupervisorProfile } from '../apps/api/src/scripts/seedSupervisor';

export default async function handler(req: Request, res: Response) {
  try {
    await connectDB();
    await seedSupervisorProfile();
  } catch (err) {
    console.error('Vercel serverless initialization notice:', err);
  }
  return app(req, res);
}

