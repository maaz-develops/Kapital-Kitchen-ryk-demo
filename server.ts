import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { hashPassword, verifyPassword, generateAuthToken, verifyAuthToken, AuthTokenPayload } from './src/server/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================================================================
// 1. PRODUCTION SECURITY HEADERS & REQUEST LIMITS
// ==============================================================================

// Request size limits (prevent resource exhaustion DOS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Custom Security Headers Middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Production-aware CORS Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : null;
  const origin = req.headers.origin;

  if (allowedOrigins && origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!allowedOrigins) {
    // In preview/dev mode without configured CORS_ORIGIN, allow same-host
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// ==============================================================================
// 2. RATE LIMITING (SLIDING WINDOW)
// ==============================================================================

const reservationRateLimits = new Map<string, number[]>();
const authRateLimits = new Map<string, number[]>();

function checkRateLimit(store: Map<string, number[]>, ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = store.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) {
    return false;
  }

  recent.push(now);
  store.set(ip, recent);
  return true;
}

// Cleanup stale rate limit entries every 10 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  const cleanup = (store: Map<string, number[]>, windowMs: number) => {
    for (const [ip, times] of store.entries()) {
      const active = times.filter((t) => now - t < windowMs);
      if (active.length === 0) store.delete(ip);
      else store.set(ip, active);
    }
  };
  cleanup(reservationRateLimits, 15 * 60 * 1000);
  cleanup(authRateLimits, 15 * 60 * 1000);
}, 10 * 60 * 1000);

// ==============================================================================
// 3. IN-MEMORY SECURE DATA STORE & ADMIN SETUP
// ==============================================================================

interface StoredReservation {
  id: string;
  referenceId: string;
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

const reservationsDatabase: StoredReservation[] = [];

// Pre-configured admin password hash storage (using bcrypt)
let currentAdminPasswordHash: string | null = process.env.ADMIN_PASSWORD_HASH || null;

// Initialize secure default hash if not provided via environment
(async () => {
  if (!currentAdminPasswordHash) {
    // Generate bcrypt hash for internal staff session verification
    currentAdminPasswordHash = await hashPassword('KapitalStaff2026!Secure');
  }
})();

// ==============================================================================
// 4. AUTHENTICATION & AUTHORIZATION MIDDLEWARE
// ==============================================================================

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Access restricted to authorized restaurant personnel.',
    });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyAuthToken(token);

  if (!payload || payload.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Insufficient privileges.',
    });
  }

  req.user = payload;
  next();
}

// ==============================================================================
// 5. PUBLIC & OPERATIONAL API ENDPOINTS
// ==============================================================================

/**
 * Health check endpoint - minimal operational confirmation
 * Never leaks stack traces, paths, or secrets.
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    restaurant: 'Kapital Kitchen',
    location: 'Modal Town, Rahim Yar Khan',
    service: 'Reservation & Public Experience API',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Public Table Reservation Submission
 * Validates, sanitizes, and registers reservation with rate limiting.
 */
app.post('/api/reservations', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  // Rate limit: max 10 reservation submissions per 15 minutes per IP
  if (!checkRateLimit(reservationRateLimits, clientIp, 10, 15 * 60 * 1000)) {
    return res.status(429).json({
      success: false,
      message: 'Too many reservation attempts. Please call us directly at 0335 7357355.',
    });
  }

  const { name, phone, guests, date, time, notes } = req.body || {};

  // Strict server-side type & length validation
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 60) {
    return res.status(400).json({
      success: false,
      message: 'Invalid name provided (must be 2-60 characters).',
    });
  }

  if (typeof phone !== 'string' || phone.trim().length < 10 || phone.trim().length > 16) {
    return res.status(400).json({
      success: false,
      message: 'Invalid contact phone provided.',
    });
  }

  // Sanitize input to protect against injection/HTML control characters
  const sanitizedName = name.replace(/[<>'"&]/g, '').trim();
  const sanitizedPhone = phone.replace(/[<>'"&]/g, '').trim();
  const sanitizedGuests = typeof guests === 'string' ? guests.slice(0, 30) : '2 Guests';
  const sanitizedDate = typeof date === 'string' ? date.slice(0, 15) : 'Today';
  const sanitizedTime = typeof time === 'string' ? time.slice(0, 10) : '20:00';
  const sanitizedNotes = typeof notes === 'string' ? notes.replace(/[<>'"&]/g, '').slice(0, 200) : '';

  const bookingRef = `KK-${Math.floor(1000 + Math.random() * 9000)}`;

  const newReservation: StoredReservation = {
    id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    referenceId: bookingRef,
    name: sanitizedName,
    phone: sanitizedPhone,
    guests: sanitizedGuests,
    date: sanitizedDate,
    time: sanitizedTime,
    notes: sanitizedNotes,
    createdAt: new Date().toISOString(),
  };

  reservationsDatabase.push(newReservation);

  // Safe logging: Never log customer phone numbers or full names
  console.log(`[Reservation Received] Reference: ${bookingRef} | Guests: ${sanitizedGuests} | Date: ${sanitizedDate}`);

  // Return filtered response (no internal DB IDs, no server paths)
  return res.status(200).json({
    success: true,
    referenceId: bookingRef,
    message: 'Table reservation received successfully. Our host will confirm via SMS.',
    data: {
      guests: sanitizedGuests,
      date: sanitizedDate,
      time: sanitizedTime,
    },
  });
});

/**
 * IDOR / BOLA Protected Reservation Lookup
 * Customers may only query a specific reservation if they supply both the referenceId
 * AND the matching phone number.
 */
app.get('/api/reservations/:refCode', (req: Request, res: Response) => {
  const { refCode } = req.params;
  const { phone } = req.query;

  if (!refCode || typeof refCode !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid reference code' });
  }

  const reservation = reservationsDatabase.find((r) => r.referenceId === refCode.toUpperCase());

  if (!reservation) {
    return res.status(404).json({ success: false, message: 'Reservation not found' });
  }

  // IDOR Protection: Require verification phone unless caller has admin token
  const authHeader = req.headers.authorization;
  const isAdmin = authHeader?.startsWith('Bearer ') && verifyAuthToken(authHeader.split(' ')[1])?.role === 'admin';

  if (!isAdmin && (!phone || typeof phone !== 'string' || reservation.phone.replace(/\D/g, '') !== phone.replace(/\D/g, ''))) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Verification phone required to view reservation details.',
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      referenceId: reservation.referenceId,
      guests: reservation.guests,
      date: reservation.date,
      time: reservation.time,
      status: 'Confirmed',
    },
  });
});

// ==============================================================================
// 6. ADMIN AUTHENTICATION & RESTRICTED DESK APIS
// ==============================================================================

/**
 * Admin Login Endpoint
 * Rate limited to 5 attempts per 15 minutes to prevent brute-force attacks.
 * Uses generic error messages to prevent username/account enumeration.
 */
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(authRateLimits, clientIp, 5, 15 * 60 * 1000)) {
    return res.status(429).json({
      success: false,
      message: 'Too many authentication attempts. Please wait 15 minutes before retrying.',
    });
  }

  const { username, password } = req.body || {};

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Invalid credentials provided.',
    });
  }

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';

  // Constant-time check pattern: Verify password even if username doesn't match to prevent timing enumeration
  const usernameMatches = username.trim().toLowerCase() === expectedUsername.toLowerCase();
  const passwordValid = currentAdminPasswordHash
    ? await verifyPassword(password, currentAdminPasswordHash)
    : false;

  if (!usernameMatches || !passwordValid) {
    // Generic failure message — NEVER reveal whether username or password was wrong
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials provided.',
    });
  }

  const token = generateAuthToken(expectedUsername, 'admin', 28800); // 8 hours

  return res.status(200).json({
    success: true,
    message: 'Authentication successful.',
    token,
    user: {
      username: expectedUsername,
      role: 'admin',
    },
  });
});

/**
 * Admin Session Verification
 */
app.get('/api/auth/me', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    user: {
      username: req.user?.username,
      role: req.user?.role,
    },
  });
});

/**
 * Admin Logout Endpoint
 */
app.post('/api/auth/logout', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
});

/**
 * Admin Reservations Desk (Protected)
 * Allows restaurant management to view upcoming reservations.
 */
app.get('/api/admin/reservations', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  // Return sanitized reservation list sorted by creation time
  const sanitizedList = reservationsDatabase.map((r) => ({
    referenceId: r.referenceId,
    name: r.name,
    phone: r.phone,
    guests: r.guests,
    date: r.date,
    time: r.time,
    notes: r.notes,
    createdAt: r.createdAt,
  }));

  return res.status(200).json({
    success: true,
    count: sanitizedList.length,
    reservations: sanitizedList,
  });
});

// ==============================================================================
// 7. FRONTEND STATIC ASSETS & SAFE ERROR HANDLING
// ==============================================================================

const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// API 404 handler (prevents HTML fallback for API routes)
app.all('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

// SPA fallback for HTML5 history routing
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('Kapital Kitchen Online Experience');
    }
  });
});

// Global Express Error Handler
// NEVER leaks stack traces, paths, or database errors to the client
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Internal Error Handler]', err instanceof Error ? err.message : 'Unknown error');
  res.status(500).json({
    success: false,
    message: 'An unexpected internal error occurred. Please try again or contact 0335 7357355.',
  });
});

// Start listener if executed directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Kapital Kitchen Server] Running securely on port ${PORT}`);
  });
}

export default app;
