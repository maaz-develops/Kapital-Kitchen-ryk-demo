import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Salt cost factor 12: intentionally expensive for modern offline brute-force protection
const BCRYPT_SALT_ROUNDS = 12;

// Secret used for HMAC session tokens (falls back to runtime-generated secure random in ephemeral dev)
const AUTH_SECRET = process.env.AUTH_SECRET || crypto.randomBytes(32).toString('hex');

export interface AuthTokenPayload {
  username: string;
  role: 'admin' | 'staff';
  iat: number;
  exp: number;
}

/**
 * Hash a password using bcrypt with a unique salt and high cost factor (12).
 * Plaintext passwords MUST NEVER be stored.
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || typeof password !== 'string' || password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Verify a plaintext password against a stored bcrypt hash in constant time.
 */
export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  if (!password || !passwordHash) return false;
  try {
    return await bcrypt.compare(password, passwordHash);
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically signed session token with expiration.
 */
export function generateAuthToken(username: string, role: 'admin' | 'staff' = 'admin', expiresInSeconds = 28800): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: AuthTokenPayload = {
    username,
    role,
    iat: now,
    exp: now + expiresInSeconds, // 8 hours default
  };

  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadEncoded)
    .digest('base64url');

  return `${payloadEncoded}.${signature}`;
}

/**
 * Verify a signed session token. Returns the payload if valid and unexpired, null otherwise.
 * Uses timingSafeEqual to protect against signature timing attacks.
 */
export function verifyAuthToken(token: string): AuthTokenPayload | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadEncoded, signature] = parts;

  try {
    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(payloadEncoded)
      .digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload: AuthTokenPayload = JSON.parse(Buffer.from(payloadEncoded, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}
