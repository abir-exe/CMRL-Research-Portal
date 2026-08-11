import { Router, Response } from 'express';
import { Notification } from '../models/Notification';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';

export const notificationRouter = Router();

// Require authentication for all notification routes
notificationRouter.use(requireAuth);

// GET /api/v1/notifications - Get current authenticated user's notifications
notificationRouter.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user!;
    const notifications = await Notification.find({ userId: user.userId })
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch notifications.' },
    });
  }
});

// GET /api/v1/notifications/unread-count - Get count of unread notifications for authenticated user
notificationRouter.get('/unread-count', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user!;
    const count = await Notification.countDocuments({ userId: user.userId, read: false });

    res.status(200).json({
      success: true,
      count,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch unread notification count.' },
    });
  }
});

// PATCH /api/v1/notifications/read-all - Mark all notifications for authenticated user as read
notificationRouter.patch('/read-all', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user!;
    await Notification.updateMany({ userId: user.userId, read: false }, { read: true });

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read.',
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to mark notifications as read.' },
    });
  }
});

// PATCH /api/v1/notifications/:id/read - Mark single notification as read (must belong to authenticated user)
notificationRouter.patch('/:id/read', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user!;
    const { id } = req.params;

    const notif = await Notification.findOne({ _id: id, userId: user.userId });
    if (!notif) {
      res.status(404).json({
        success: false,
        error: { code: 'NOTIFICATION_NOT_FOUND', message: 'Notification not found or access denied.' },
      });
      return;
    }

    notif.read = true;
    await notif.save();

    res.status(200).json({
      success: true,
      data: notif,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update notification status.' },
    });
  }
});
