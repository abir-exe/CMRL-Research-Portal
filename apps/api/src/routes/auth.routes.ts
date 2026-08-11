import { Router, Response } from 'express';
import { verifyFirebaseToken, setFirebaseCustomRoleClaim } from '../config/firebaseAdmin';
import { User } from '../models/User';
import { notifyUsersByRole } from '../models/Notification';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { normalizeBDMobile, validateUniversityRoll } from '@cmrl/shared';

export const authRouter = Router();

// POST /api/v1/auth/sync - Sync Firebase user with MongoDB
authRouter.post('/sync', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Bearer authentication token required.' },
      });
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyFirebaseToken(token);

    if (!decodedToken) {
      res.status(401).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired Firebase token.' },
      });
      return;
    }

    const { uid, email, name, picture } = decodedToken;
    const reqProfile = req.body?.profile || {};

    // 1. Strict lookup by firebaseUid first
    let user = await User.findOne({ firebaseUid: uid });

    // 2. If not found by firebaseUid, check for an UNLINKED pre-provisioned account by email
    if (!user && email) {
      const preProvisionedUser = await User.findOne({ 'profile.email': email });
      if (preProvisionedUser && preProvisionedUser.firebaseUid.startsWith('PROVISIONED_')) {
        // Legitimate first authentication for pre-provisioned account -> link firebaseUid
        preProvisionedUser.firebaseUid = uid;
        if (picture && !preProvisionedUser.profile.googlePhotoUrl) {
          preProvisionedUser.profile.googlePhotoUrl = picture;
        }
        await preProvisionedUser.save();
        await setFirebaseCustomRoleClaim(uid, preProvisionedUser.role);
        user = preProvisionedUser;
      }
    }

    if (!user) {
      // Validate registration fields if provided
      if (reqProfile.universityRoll && !validateUniversityRoll(reqProfile.universityRoll)) {
        res.status(400).json({
          success: false,
          error: { code: 'INVALID_ROLL', message: 'University Roll must contain digits only.' },
        });
        return;
      }

      let normalizedMobile = '';
      if (reqProfile.mobile) {
        const validMobile = normalizeBDMobile(reqProfile.mobile);
        if (!validMobile) {
          res.status(400).json({
            success: false,
            error: { code: 'INVALID_MOBILE', message: 'Please enter a valid Bangladeshi mobile number (+8801XXXXXXXXX).' },
          });
          return;
        }
        normalizedMobile = validMobile;
      }

      // New registration -> create MongoDB document with PENDING accountStatus
      const generatedUserId = `CMRL-USER-${Math.floor(100000 + Math.random() * 900000)}`;

      const newUser = new User({
        firebaseUid: uid,
        userId: generatedUserId,
        role: 'STUDENT',
        accountStatus: 'PENDING',
        rank: 'NEWBIE',
        profile: {
          email: email || '',
          fullName: reqProfile.fullName || name || '',
          photoUrl: picture || '',
          googlePhotoUrl: picture || '',
          university: reqProfile.university || 'Pabna University of Science and Technology',
          department: reqProfile.department || 'Department of Physics',
          universityRoll: reqProfile.universityRoll ? reqProfile.universityRoll.trim() : '',
          gender: reqProfile.gender || '',
          mobile: normalizedMobile,
        },
      });

      try {
        await newUser.save();
        // Set initial Firebase custom claim for role ONLY (no accountStatus or rank)
        const claimSuccess = await setFirebaseCustomRoleClaim(uid, 'STUDENT');
        if (!claimSuccess) {
          throw new Error('FAILED_CUSTOM_CLAIM');
        }
        user = newUser;

        // Notify SUPERVISOR and ADMIN roles about new pending registration
        await notifyUsersByRole(['SUPERVISOR', 'ADMIN'], {
          type: 'NEW_REGISTRATION',
          title: 'New Registration Pending',
          message: `A new student registration (${newUser.profile.email}) is waiting for approval.`,
          linkForRole: (role) => (role === 'ADMIN' ? '/admin' : '/supervisor'),
        });
      } catch {
        // Sync failure safety: Rollback newly created MongoDB user if saved
        if (newUser && newUser._id) {
          await User.deleteOne({ _id: newUser._id }).catch(() => {});
        }
        res.status(500).json({
          success: false,
          error: {
            code: 'SYNC_FAILED',
            message: 'Failed to synchronize user profile to CMRL database.',
          },
        });
        return;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        userId: user.userId,
        firebaseUid: user.firebaseUid,
        role: user.role,
        accountStatus: user.accountStatus,
        rank: user.rank,
        profile: user.profile,
        createdAt: user.createdAt,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during user synchronization.' },
    });
  }
});

// GET /api/v1/auth/me - Get current authenticated user context
authRouter.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required.' },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      userId: user.userId,
      firebaseUid: user.firebaseUid,
      role: user.role,
      accountStatus: user.accountStatus,
      rank: user.rank,
      profile: user.profile,
      researchProfile: user.researchProfile,
      externalProfiles: user.externalProfiles,
      privacy: user.privacy,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});
