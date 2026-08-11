import { Router, Response } from 'express';
import { User, UserRole, StudentRank } from '../models/User';
import { AuditLog, logAuditAction } from '../models/AuditLog';
import { createNotification } from '../models/Notification';
import { requireAuth, requireActive, requireRole, AuthenticatedRequest } from '../middleware/auth.middleware';
import { setFirebaseCustomRoleClaim } from '../config/firebaseAdmin';

export const adminRouter = Router();

// Apply auth and active account requirement to all /api/v1/admin routes
adminRouter.use(requireAuth);
adminRouter.use(requireActive);
adminRouter.use(requireRole('ADMIN', 'SUPERVISOR'));

// GET /api/v1/admin/users/pending - Retrieve all pending user registrations
adminRouter.get('/users/pending', async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const pendingUsers = await User.find({ accountStatus: 'PENDING' })
      .sort({ createdAt: -1 })
      .select('userId firebaseUid role accountStatus rank profile researchProfile createdAt');

    res.status(200).json({
      success: true,
      data: pendingUsers.map((user) => ({
        userId: user.userId,
        firebaseUid: user.firebaseUid,
        role: user.role,
        accountStatus: user.accountStatus,
        rank: user.rank,
        profile: user.profile,
        researchProfile: user.researchProfile,
        createdAt: user.createdAt,
      })),
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch pending registrations.' },
    });
  }
});

// GET /api/v1/admin/users - Query members list (filters: status, role)
adminRouter.get('/users', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { status, role } = req.query;
    const filter: Record<string, unknown> = {};

    if (status && typeof status === 'string') {
      filter.accountStatus = status;
    }
    if (role && typeof role === 'string') {
      filter.role = role;
    }

    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .select('userId firebaseUid role accountStatus rank profile researchProfile createdAt');

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch members list.' },
    });
  }
});

// GET /api/v1/admin/users/:userId - Get member details by userId
adminRouter.get('/users/:userId', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `User with ID '${userId}' was not found.` },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch user details.' },
    });
  }
});

// PATCH /api/v1/admin/users/:userId/approve - Approve a pending user registration
adminRouter.patch('/users/:userId/approve', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { role } = req.body || {};
    const actor = req.user!;

    const user = await User.findOne({ userId });

    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `User with ID '${userId}' was not found.` },
      });
      return;
    }

    if (user.accountStatus !== 'PENDING') {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ACCOUNT_STATUS',
          message: `Cannot approve user with status '${user.accountStatus}'. Only PENDING accounts can be approved.`,
        },
      });
      return;
    }

    if (role && ['STUDENT', 'SUPERVISOR', 'ADMIN'].includes(role)) {
      user.role = role as UserRole;
    }

    user.accountStatus = 'ACTIVE';
    await user.save();

    await setFirebaseCustomRoleClaim(user.firebaseUid, user.role);

    // Audit log & Notification
    await logAuditAction({
      actorUserId: actor.userId,
      actorRole: actor.role,
      action: 'USER_APPROVED',
      targetUserId: user.userId,
      metadata: { newStatus: 'ACTIVE', assignedRole: user.role },
    });

    if (actor.userId !== user.userId) {
      const targetLink = user.role === 'ADMIN' ? '/admin' : user.role === 'SUPERVISOR' ? '/supervisor' : '/dashboard';
      await createNotification({
        userId: user.userId,
        type: 'ACCOUNT_APPROVED',
        title: 'Account Approved',
        message: 'Your CMRL account has been approved. You can now access the research portal.',
        link: targetLink,
      });
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
        updatedAt: user.updatedAt,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to approve user registration.' },
    });
  }
});

// PATCH /api/v1/admin/users/:userId/reject - Reject a pending user registration
adminRouter.patch('/users/:userId/reject', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const actor = req.user!;

    const user = await User.findOne({ userId });

    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `User with ID '${userId}' was not found.` },
      });
      return;
    }

    if (user.accountStatus !== 'PENDING') {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ACCOUNT_STATUS',
          message: `Cannot reject user with status '${user.accountStatus}'. Only PENDING accounts can be rejected.`,
        },
      });
      return;
    }

    user.accountStatus = 'REJECTED';
    await user.save();

    await logAuditAction({
      actorUserId: actor.userId,
      actorRole: actor.role,
      action: 'USER_REJECTED',
      targetUserId: user.userId,
    });

    if (actor.userId !== user.userId) {
      await createNotification({
        userId: user.userId,
        type: 'ACCOUNT_REJECTED',
        title: 'Registration Status Update',
        message: 'Your registration application was not approved at this time.',
      });
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
        updatedAt: user.updatedAt,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to reject user registration.' },
    });
  }
});

// PATCH /api/v1/admin/users/:userId/suspend - Suspend an active member
adminRouter.patch('/users/:userId/suspend', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const actor = req.user!;

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `User with ID '${userId}' was not found.` },
      });
      return;
    }

    user.accountStatus = 'SUSPENDED';
    await user.save();

    await logAuditAction({
      actorUserId: actor.userId,
      actorRole: actor.role,
      action: 'USER_SUSPENDED',
      targetUserId: user.userId,
    });

    if (actor.userId !== user.userId) {
      await createNotification({
        userId: user.userId,
        type: 'ACCOUNT_SUSPENDED',
        title: 'Account Suspended',
        message: 'Your CMRL account access has been suspended.',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to suspend user.' },
    });
  }
});

// PATCH /api/v1/admin/users/:userId/reactivate - Reactivate a suspended member
adminRouter.patch('/users/:userId/reactivate', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const actor = req.user!;

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `User with ID '${userId}' was not found.` },
      });
      return;
    }

    user.accountStatus = 'ACTIVE';
    await user.save();

    await logAuditAction({
      actorUserId: actor.userId,
      actorRole: actor.role,
      action: 'USER_REACTIVATED',
      targetUserId: user.userId,
    });

    if (actor.userId !== user.userId) {
      const targetLink = user.role === 'ADMIN' ? '/admin' : user.role === 'SUPERVISOR' ? '/supervisor' : '/dashboard';
      await createNotification({
        userId: user.userId,
        type: 'ACCOUNT_REACTIVATED',
        title: 'Account Reactivated',
        message: 'Your CMRL account has been reactivated.',
        link: targetLink,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to reactivate user.' },
    });
  }
});

// PATCH /api/v1/admin/users/:userId/rank - Change member rank (Informational ONLY, does not alter role)
adminRouter.patch('/users/:userId/rank', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { rank } = req.body || {};
    const actor = req.user!;

    const validRanks: StudentRank[] = ['NEWBIE', 'MEMBER', 'SENIOR_MEMBER', 'CREATOR', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'LEGEND'];

    if (!rank || !validRanks.includes(rank)) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_RANK', message: `Rank must be one of: ${validRanks.join(', ')}.` },
      });
      return;
    }

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `User with ID '${userId}' was not found.` },
      });
      return;
    }

    const oldRank = user.rank;
    user.rank = rank;
    await user.save();

    await logAuditAction({
      actorUserId: actor.userId,
      actorRole: actor.role,
      action: 'USER_RANK_CHANGED',
      targetUserId: user.userId,
      metadata: { oldRank, newRank: rank },
    });

    if (actor.userId !== user.userId) {
      const targetLink = user.role === 'ADMIN' ? '/admin' : user.role === 'SUPERVISOR' ? '/supervisor' : '/dashboard';
      await createNotification({
        userId: user.userId,
        type: 'SYSTEM_NOTICE',
        title: 'Rank Updated',
        message: 'Your CMRL rank has been updated.',
        link: targetLink,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update member rank.' },
    });
  }
});

// =========================================================================
// ADMIN-ONLY SYSTEM OPERATIONS (Supervisors receive 403 Forbidden)
// =========================================================================

// PATCH /api/v1/admin/users/:userId/role - Change user authorization role (ADMIN ONLY)
adminRouter.patch('/users/:userId/role', requireRole('ADMIN'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { role } = req.body || {};
    const actor = req.user!;

    if (!role || !['STUDENT', 'SUPERVISOR', 'ADMIN'].includes(role)) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_ROLE', message: "Role must be 'STUDENT', 'SUPERVISOR', or 'ADMIN'." },
      });
      return;
    }

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `User with ID '${userId}' was not found.` },
      });
      return;
    }

    const oldRole = user.role;
    user.role = role as UserRole;

    // Fail-safe synchronization of Firebase custom role claim
    const claimSuccess = await setFirebaseCustomRoleClaim(user.firebaseUid, user.role);
    if (!claimSuccess) {
      res.status(500).json({
        success: false,
        error: {
          code: 'SYNC_FAILED',
          message: 'Failed to synchronize role change with Firebase custom claims.',
        },
      });
      return;
    }

    await user.save();

    await logAuditAction({
      actorUserId: actor.userId,
      actorRole: actor.role,
      action: 'USER_ROLE_CHANGED',
      targetUserId: user.userId,
      metadata: { oldRole, newRole: role },
    });

    if (actor.userId !== user.userId) {
      const roleName = user.role === 'SUPERVISOR' ? 'Supervisor' : user.role === 'ADMIN' ? 'Admin' : 'Student';
      const targetLink = user.role === 'ADMIN' ? '/admin' : user.role === 'SUPERVISOR' ? '/supervisor' : '/dashboard';
      await createNotification({
        userId: user.userId,
        type: 'SYSTEM_NOTICE',
        title: 'Role Updated',
        message: `Your CMRL role has been changed to ${roleName}.`,
        link: targetLink,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update user role.' },
    });
  }
});

// GET /api/v1/admin/audit-logs - View administrative audit log entries (ADMIN ONLY)
adminRouter.get('/audit-logs', requireRole('ADMIN'), async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch audit logs.' },
    });
  }
});

// GET /api/v1/admin/system/overview - Overall system metrics (ADMIN ONLY)
adminRouter.get('/system/overview', requireRole('ADMIN'), async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const studentsCount = await User.countDocuments({ role: 'STUDENT' });
    const supervisorsCount = await User.countDocuments({ role: 'SUPERVISOR' });
    const adminsCount = await User.countDocuments({ role: 'ADMIN' });
    const pendingCount = await User.countDocuments({ accountStatus: 'PENDING' });
    const suspendedCount = await User.countDocuments({ accountStatus: 'SUSPENDED' });
    const recentLogs = await AuditLog.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        studentsCount,
        supervisorsCount,
        adminsCount,
        pendingCount,
        suspendedCount,
        recentLogs,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch system overview.' },
    });
  }
});
