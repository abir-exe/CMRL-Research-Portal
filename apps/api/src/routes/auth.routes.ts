import { Router, Response } from 'express';
import { verifyFirebaseToken, setFirebaseCustomRoleClaim } from '../config/firebaseAdmin';
import { User } from '../models/User';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';

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
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
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
          fullName: name || '',
          photoUrl: picture || '',
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
