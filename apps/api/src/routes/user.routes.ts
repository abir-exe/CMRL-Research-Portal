import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

export const userRouter = Router();

const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fullName: z.string().optional(),
  university: z.string().optional(),
  department: z.string().optional(),
  batch: z.string().optional(),
  mobile: z.string().optional(),
  bio: z.string().optional(),
  researchInterests: z.array(z.string()).optional(),
});

// PATCH /api/v1/users/profile - Update user profile
userRouter.patch('/profile', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required.' },
      });
      return;
    }

    const validationResult = updateProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid profile data provided.',
          fields: validationResult.error.flatten().fieldErrors,
        },
      });
      return;
    }

    const { firstName, lastName, fullName, university, department, batch, mobile, bio, researchInterests } = validationResult.data;

    if (firstName !== undefined) user.profile.firstName = firstName;
    if (lastName !== undefined) user.profile.lastName = lastName;
    if (fullName !== undefined) user.profile.fullName = fullName;
    if (university !== undefined) user.profile.university = university;
    if (department !== undefined) user.profile.department = department;
    if (batch !== undefined) user.profile.batch = batch;
    if (mobile !== undefined) user.profile.mobile = mobile;

    if (bio !== undefined) {
      if (!user.researchProfile) user.researchProfile = {};
      user.researchProfile.bio = bio;
    }
    if (researchInterests !== undefined) {
      if (!user.researchProfile) user.researchProfile = {};
      user.researchProfile.researchInterests = researchInterests;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        userId: user.userId,
        profile: user.profile,
        researchProfile: user.researchProfile,
        updatedAt: user.updatedAt,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update user profile.' },
    });
  }
});
