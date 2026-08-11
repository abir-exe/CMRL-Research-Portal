import { Request, Response, NextFunction } from 'express';
import { verifyFirebaseToken } from '../config/firebaseAdmin';
import { User, IUser, UserRole } from '../models/User';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
  firebaseUser?: DecodedIdToken;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication token is required.',
      },
    });
    return;
  }

  const token = authHeader.split('Bearer ')[1];
  const decodedToken = await verifyFirebaseToken(token);

  if (!decodedToken) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired authentication token.',
      },
    });
    return;
  }

  // Fetch corresponding MongoDB User document
  const mongoUser = await User.findOne({ firebaseUid: decodedToken.uid });

  // Synchronization failure safety: If Firebase auth succeeds but MongoDB user doesn't exist, fail safely
  if (!mongoUser) {
    res.status(401).json({
      success: false,
      error: {
        code: 'USER_NOT_SYNCHRONIZED',
        message: 'User identity is verified with Firebase, but no corresponding CMRL account was found. Please synchronize account.',
      },
    });
    return;
  }

  req.firebaseUser = decodedToken;
  req.user = mongoUser;
  next();
}

export function requireActive(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'User context is missing.' },
    });
    return;
  }

  if (req.user.accountStatus === 'PENDING') {
    res.status(403).json({
      success: false,
      error: {
        code: 'ACCOUNT_PENDING',
        message: 'Your account registration is pending supervisor or administrator approval.',
      },
    });
    return;
  }

  if (req.user.accountStatus === 'SUSPENDED') {
    res.status(403).json({
      success: false,
      error: {
        code: 'ACCOUNT_SUSPENDED',
        message: 'Your account has been suspended. Please contact the lab supervisor.',
      },
    });
    return;
  }

  if (req.user.accountStatus !== 'ACTIVE') {
    res.status(403).json({
      success: false,
      error: {
        code: 'ACCOUNT_INACTIVE',
        message: 'Your account is inactive.',
      },
    });
    return;
  }

  next();
}

export function requireRole(...roles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User context is missing.' },
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN_ROLE',
          message: `Access denied. Requires one of the following roles: ${roles.join(', ')}.`,
        },
      });
      return;
    }

    next();
  };
}
