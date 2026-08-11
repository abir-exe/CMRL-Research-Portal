import { Schema, model, Document } from 'mongoose';

export interface IAuditLog extends Document {
  actorUserId: string;
  actorRole: string;
  action: string;
  targetUserId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actorUserId: { type: String, required: true, index: true },
    actorRole: { type: String, required: true },
    action: { type: String, required: true, index: true },
    targetUserId: { type: String, index: true },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const AuditLog = model<IAuditLog>('AuditLog', AuditLogSchema);

export async function logAuditAction(params: {
  actorUserId: string;
  actorRole: string;
  action: string;
  targetUserId?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    await AuditLog.create(params);
  } catch (error) {
    console.error('Failed to log audit action:', error);
  }
}
