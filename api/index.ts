import { Request, Response } from 'express';
// Import compiled JavaScript modules from apps/api/dist to prevent uncompiled TypeScript module resolution errors in Vercel Node runtime
import { app } from '../apps/api/dist/app';
import { connectDB } from '../apps/api/dist/config/db';
import { seedSupervisorProfile } from '../apps/api/dist/scripts/seedSupervisor';

export default async function handler(req: Request, res: Response) {
  try {
    await connectDB();
    await seedSupervisorProfile();
  } catch (err) {
    console.error('Vercel serverless initialization notice:', err);
  }
  return app(req, res);
}

