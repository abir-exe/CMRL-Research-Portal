import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { z } from 'zod';
import { normalizeBDMobile, validateUniversityRoll } from '@cmrl/shared';

export const userRouter = Router();

const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fullName: z.string().optional(),
  gender: z.enum(['Male', 'Female', '']).optional(),
  university: z.string().optional(),
  department: z.string().optional(),
  universityRoll: z.string().optional(),
  batch: z.string().optional(),
  mobile: z.string().optional(),
  photoUrl: z.string().optional(),
  googlePhotoUrl: z.string().optional(),
  bio: z.string().optional(),
  researchInterests: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  software: z.array(z.string()).optional(),
  programmingLanguages: z.array(z.string()).optional(),
  externalProfiles: z
    .object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      orcid: z.string().optional(),
      researchGate: z.string().optional(),
      googleScholar: z.string().optional(),
    })
    .optional(),
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

    const {
      firstName,
      lastName,
      fullName,
      gender,
      university,
      department,
      universityRoll,
      batch,
      mobile,
      photoUrl,
      googlePhotoUrl,
      bio,
      researchInterests,
      skills,
      software,
      programmingLanguages,
      externalProfiles,
    } = validationResult.data;

    // Mobile Validation if provided
    if (mobile !== undefined && mobile !== '') {
      const validMobile = normalizeBDMobile(mobile);
      if (!validMobile) {
        res.status(400).json({
          success: false,
          error: { code: 'INVALID_MOBILE', message: 'Please enter a valid Bangladeshi mobile number (+8801XXXXXXXXX).' },
        });
        return;
      }
      user.profile.mobile = validMobile;
    } else if (mobile === '') {
      user.profile.mobile = '';
    }

    // University Roll Validation & Lock Check
    if (universityRoll !== undefined && universityRoll !== '') {
      if (!validateUniversityRoll(universityRoll)) {
        res.status(400).json({
          success: false,
          error: { code: 'INVALID_ROLL', message: 'University Roll must contain digits only.' },
        });
        return;
      }

      // Check lock for ACTIVE users if roll is changing
      if (user.accountStatus === 'ACTIVE' && user.profile.universityRoll && user.profile.universityRoll !== universityRoll.trim()) {
        res.status(400).json({
          success: false,
          error: {
            code: 'ROLL_LOCKED',
            message: 'Active members cannot modify University Roll. Contact an administrator for profile corrections.',
          },
        });
        return;
      }

      user.profile.universityRoll = universityRoll.trim();
    }

    if (firstName !== undefined) user.profile.firstName = firstName;
    if (lastName !== undefined) user.profile.lastName = lastName;
    if (fullName !== undefined) user.profile.fullName = fullName;
    if (gender !== undefined) user.profile.gender = gender;
    if (university !== undefined) user.profile.university = university;
    if (department !== undefined) user.profile.department = department;
    if (batch !== undefined) user.profile.batch = batch;
    if (photoUrl !== undefined) user.profile.photoUrl = photoUrl;
    if (googlePhotoUrl !== undefined) user.profile.googlePhotoUrl = googlePhotoUrl;

    if (bio !== undefined || researchInterests !== undefined || skills !== undefined || software !== undefined || programmingLanguages !== undefined) {
      if (!user.researchProfile) user.researchProfile = {};
      if (bio !== undefined) user.researchProfile.bio = bio;
      if (researchInterests !== undefined) user.researchProfile.researchInterests = researchInterests;
      if (skills !== undefined) user.researchProfile.skills = skills;
      if (software !== undefined) user.researchProfile.software = software;
      if (programmingLanguages !== undefined) user.researchProfile.programmingLanguages = programmingLanguages;
    }

    if (externalProfiles !== undefined) {
      if (!user.externalProfiles) user.externalProfiles = {};
      if (externalProfiles.linkedin !== undefined) user.externalProfiles.linkedin = externalProfiles.linkedin;
      if (externalProfiles.github !== undefined) user.externalProfiles.github = externalProfiles.github;
      if (externalProfiles.orcid !== undefined) user.externalProfiles.orcid = externalProfiles.orcid;
      if (externalProfiles.researchGate !== undefined) user.externalProfiles.researchGate = externalProfiles.researchGate;
      if (externalProfiles.googleScholar !== undefined) user.externalProfiles.googleScholar = externalProfiles.googleScholar;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        userId: user.userId,
        profile: user.profile,
        researchProfile: user.researchProfile,
        externalProfiles: user.externalProfiles,
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
