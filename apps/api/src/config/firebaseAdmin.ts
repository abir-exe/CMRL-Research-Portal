import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import pino from 'pino';

const logger = pino({ name: 'firebase-admin' });

let firebaseAdminApp: App | null = null;

export function getFirebaseAdmin(): App | null {
  if (firebaseAdminApp) {
    return firebaseAdminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (!projectId || !clientEmail || !privateKey) {
    logger.warn(
      'Firebase Admin credentials (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) are not fully provided. Firebase Token Verification will be disabled in unconfigured dev environment.'
    );
    return null;
  }

  try {
    const existingApps = getApps();
    if (existingApps.length === 0) {
      firebaseAdminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      logger.info('Firebase Admin SDK initialized successfully.');
    } else {
      firebaseAdminApp = existingApps[0]!;
    }
    return firebaseAdminApp;
  } catch (error) {
    logger.error({ err: error }, 'Failed to initialize Firebase Admin SDK.');
    return null;
  }
}

export async function verifyFirebaseToken(token: string): Promise<DecodedIdToken | null> {
  const adminApp = getFirebaseAdmin();
  if (!adminApp) {
    logger.warn('Skipping Firebase token verification (Firebase Admin SDK not configured).');
    return null;
  }

  try {
    const auth = getAuth(adminApp);
    return await auth.verifyIdToken(token);
  } catch (error) {
    logger.error({ err: error }, 'Failed to verify Firebase ID token.');
    return null;
  }
}

export async function setFirebaseCustomRoleClaim(uid: string, role: string): Promise<boolean> {
  const adminApp = getFirebaseAdmin();
  if (!adminApp) {
    logger.error({ uid, role }, 'Cannot assign Firebase Custom Role Claim: Firebase Admin SDK is not configured.');
    return false;
  }

  try {
    const auth = getAuth(adminApp);
    // ONLY set the role in Custom Claims (no accountStatus or rank)
    await auth.setCustomUserClaims(uid, { role });
    logger.info({ uid, role }, 'Successfully assigned Firebase custom role claim.');
    return true;
  } catch (error) {
    logger.error({ err: error, uid, role }, 'Failed to assign Firebase custom role claim.');
    return false;
  }
}
