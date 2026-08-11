import { Schema, model, Document } from 'mongoose';
import { User, UserRole } from './User';

export type NotificationType =
  | 'ACCOUNT_APPROVED'
  | 'ACCOUNT_REJECTED'
  | 'ACCOUNT_SUSPENDED'
  | 'ACCOUNT_REACTIVATED'
  | 'NEW_REGISTRATION'
  | 'ANNOUNCEMENT'
  | 'RESEARCH_UPDATE'
  | 'PUBLICATION_UPDATE'
  | 'MATERIAL_UPDATE'
  | 'ACHIEVEMENT_UPDATE'
  | 'SYSTEM_NOTICE'
  | 'GENERAL';

export interface INotification extends Document {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: [
        'ACCOUNT_APPROVED',
        'ACCOUNT_REJECTED',
        'ACCOUNT_SUSPENDED',
        'ACCOUNT_REACTIVATED',
        'NEW_REGISTRATION',
        'ANNOUNCEMENT',
        'RESEARCH_UPDATE',
        'PUBLICATION_UPDATE',
        'MATERIAL_UPDATE',
        'ACHIEVEMENT_UPDATE',
        'SYSTEM_NOTICE',
        'GENERAL',
      ],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Notification = model<INotification>('Notification', NotificationSchema);

export async function createNotification(params: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}): Promise<void> {
  try {
    await Notification.create(params);
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
}

export async function notifyUsersByRole(
  roles: UserRole[],
  params: {
    type: NotificationType;
    title: string;
    message: string;
    linkForRole?: (role: UserRole) => string;
  }
): Promise<void> {
  try {
    const targetUsers = await User.find({
      role: { $in: roles },
      accountStatus: 'ACTIVE',
    }).select('userId role');

    if (targetUsers.length === 0) return;

    const docs = targetUsers.map((u) => ({
      userId: u.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      link: params.linkForRole ? params.linkForRole(u.role) : undefined,
    }));

    await Notification.insertMany(docs);
  } catch (error) {
    console.error('Failed to notify users by role:', error);
  }
}
