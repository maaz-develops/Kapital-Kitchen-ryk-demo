# KAPITAL KITCHEN — PRODUCTION ARCHITECTURE & PERMANENT MAINTENANCE MANUAL

> **Permanent Specification & Engineering Runbook**
> Restaurant: **Kapital Kitchen**
> Verified Location: **C8F6+9MF, Modal Town, Rahim Yar Khan, Punjab 64200, Pakistan**
> Official Contact: **0335 7357355** (`tel:+923357357355`)

---

## 🤖 CRITICAL DIRECTIVE FOR FUTURE AI ASSISTANTS

Whenever this file is provided to an AI coding assistant together with the current project, the assistant must:
1. First inspect the current project and compare it against this maintenance specification.
2. Identify the actual root cause of any requested issue rather than patching symptoms.
3. Make the smallest safe change necessary.
4. **DO NOT rebuild the website from scratch.**
5. **DO NOT randomly redesign it.**
6. **DO NOT remove working functionality or replace real Kapital Kitchen assets.**
7. **DO NOT introduce fake business information, fake statistics, fake reviews, or fake offers.**
8. **DO NOT expose customer private data or commit secrets.**
9. **DO NOT hide responsive bugs with arbitrary overflow hacks.**
10. Test the affected areas, perform a complete regression audit across viewports, and only then report completion.

### Maintenance Workflow Diagram:
```
USER REPORTS ISSUE
       ↓
READ KAPITAL-KITCHEN-MAINTENANCE.md
       ↓
INSPECT CURRENT PROJECT
       ↓
REPRODUCE ISSUE
       ↓
IDENTIFY ROOT CAUSE
       ↓
MAKE MINIMAL SAFE FIX
       ↓
TEST RELATED COMPONENTS
       ↓
TEST RESPONSIVE BREAKPOINTS (320px -> 1920px+)
       ↓
TEST DESKTOP & MOBILE
       ↓
CHECK CONSOLE & NETWORK
       ↓
CHECK SECURITY & PRIVACY IMPACT
       ↓
REGRESSION TEST
       ↓
UPDATE MAINTENANCE FILE IF ARCHITECTURE CHANGED
       ↓
FINAL REPORT
```

---

## 1. WHAT THE PROJECT IS
Kapital Kitchen is a high-end, luxury editorial digital experience and web application representing the authentic **Kapital Kitchen** steakhouse, burger, woodfired pizza, and cafe establishment situated in **Modal Town, Rahim Yar Khan, Punjab, Pakistan**.

The platform is designed to:
- Showcase authentic culinary craftsmanship with real high-resolution restaurant photography.
- Deliver an editorial, typography-driven narrative without generic restaurant clichés.
- Provide a customer-friendly booking and reservation system that respects customer privacy.
- Support both **static hosting** (e.g. GitHub Pages) and **full-stack Node.js hosting** (Express + Docker/Cloud Run/Render).

---

## 2. CURRENT DESIGN SYSTEM
- **Theme**: Ultra-dark luxury canvas (`#0C0C0C` background, `#080808` / `#121212` elevated surfaces).
- **Core Contrast Text**: `#F7F7F2` (cream-white) with secondary `#A3A3A3` / `#737373` neutral tints.
- **Brand Accent**: `#EAB308` (Kapital Gold) with ambient glow (`drop-shadow-[0_0_25px_rgba(234,179,8,0.25)]`).
- **Aesthetic**: Editorial magazine typography meets brutalist precision and smooth kinetic momentum.
- **Imagery**: Real culinary and interior photography (never replace with stock illustrations or generic templates).

---

## 3. TYPOGRAPHY SYSTEM
- **Display Font**: `Syne`, sans-serif (Weights 700, 800, 900) for monumental editorial headings, brand wordmarks, numbers, and chapter titles.
- **Body & Interface Font**: `Plus Jakarta Sans`, sans-serif (Weights 300, 400, 500, 600, 700) for labels, descriptions, navigation, and inputs.
- **Monospace Kicker**: System monospace for metadata badges, timestamps, prep times, and coordinates.

### Hierarchy & Responsive Rules:
- **Hero Title**: Dual-axis responsive clamp combining viewport width and viewport height:
  `text-[clamp(2.1rem,min(9vw,10vh),3.6rem)] sm:text-[clamp(3.2rem,min(9.8vw,12vh),5.5rem)] ... xl:text-[clamp(6rem,min(11.5vw,15vh),11rem)]`
  *Reason*: Prevents vertical clipping on landscape tablets, laptops with browser toolbars, or small phones.
- **Card Titles**: Scaled to parent container (5-col narrow cards use `text-lg sm:text-xl lg:text-2xl`; 7-col wider cards use `text-xl sm:text-2xl lg:text-3xl`).
- **Wordmark ("KAPITAL KITCHEN")**: Both words MUST remain visible on a single row without breaking or clipping across viewports.

---

## 4. COLOR SYSTEM
| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| `Canvas Dark` | `#0C0C0C` | Primary site background |
| `Surface Card` | `#121212` | Modal and elevation background |
| `Surface Border`| `rgba(255,255,255,0.1)` | Subtle structural borders |
| `Brand Gold` | `#EAB308` | Primary accent, CTA badges, highlights |
| `Brand Amber` | `#F59E0B` | Secondary warm glow |
| `Light Cream` | `#F7F7F2` | Monumental display text |
| `Neutral Muted`| `#A3A3A3` | Subtitles and paragraph body text |

---

## 5. LAYOUT SYSTEM
- Container max-width: `max-w-7xl` centered with responsive horizontal padding (`px-4 sm:px-8 lg:px-16`).
- Section separation: Asymmetric vertical padding (`py-16 sm:py-24 md:py-32`) with thin structural dividers (`border-t border-white/10`).
- Strict overflow protection: Document root uses `overflow-x: hidden; width: 100%; max-width: 100%;`.

---

## 6. RESPONSIVE BREAKPOINTS
The website is tested and certified across all standard device viewports:
- **Mobile**: `320px`, `360px`, `375px`, `390px`, `393px`, `414px`, `430px`, `480px`
- **Tablet**: `600px`, `768px`, `820px`, `900px`, `1024px`
- **Laptop**: `1100px`, `1280px`, `1366px`, `1440px`
- **Desktop & Ultrawide**: `1536px`, `1600px`, `1920px`, `2560px`, `3840px`
- **Orientations**: Both Portrait and Landscape (tested down to `375px` viewport height).

---

## 7. NAVBAR BEHAVIOR
- Fixed top floating pill with `pointer-events-none` wrapper and `pointer-events-auto` inner pill.
- Glassmorphism backdrop blur (`backdrop-blur-xl bg-black/82`).
- Responsive containment:
  - On 320px–359px: Compact brand logo, compact "BOOK" CTA button (`min-h-[32px]`), mobile hamburger icon. Total content width is ~239px inside a 284px inner pill, leaving 45px of breathing room with ZERO horizontal scrolling or clipping.
  - On 360px–767px: Brand scales fluidly (`clamp(11px, 2.2vw, 15px)`), button displays "BOOK TABLE".
  - On 768px–1279px (Tablets, Laptops, and 125% scaled displays): "Full Menu" modal button appears, "BOOK TABLE" CTA, and hamburger menu. Content occupies ~462px of 920px available space, giving over 450px of buffer room so right-side buttons NEVER touch or cross the screen edge.
  - On 1280px+ (`xl:`): Full 6 desktop navigation links (`STORY`, `SIGNATURES`, `THE MENU`, `ATMOSPHERE`, `GALLERY`, `LOCATION`) appear cleanly in the center, and the hamburger button is hidden (`xl:hidden`).
- Mobile Menu Drawer: Full-screen overlay with smooth Framer Motion transitions, large editorial navigation anchors, direct phone link (`0335 7357355`), and table reservation CTA.

---

## 8. CENTER TYPOGRAPHY BEHAVIOR
- **Component**: `src/components/CenterEditorialBranding.tsx`
- **Location**: Mounted centrally between the culinary menu chapters and the sensory experience.
- **Visual Rows**:
  - Row 1: `KAPITAL KITCHEN → → →` (moves smoothly rightward on scroll down, leftward on scroll up)
  - Row 2: `← ← ← RAHIM YAR KHAN` (moves counter-directionally in text-outline luxury typography)
- **Kinetic Engine**: Driven by `requestAnimationFrame` and GPU-accelerated `translate3d()` transforms with ambient drift and scroll velocity damping.
- **Strict Containment**: Each row is contained within `overflow-hidden` wrappers so the page never develops a horizontal scrollbar.
- **Copy Restrictions**: Contains strictly `KAPITAL KITCHEN` and `RAHIM YAR KHAN`. Zero marketing clutter, zero fake statistics or fake reviews.

---

## 9. HERO BEHAVIOR
- **Root Element**: `min-h-[100svh]` utilizing Small Viewport Height (`svh`) to adapt to dynamic mobile address bars.
- **Background**: Authentic interior ambiance photography with subtle parallax transform (`y: 0% -> 22%`) and radial vignette.
- **Both Words Guaranteed**: `KAPITAL` (Row 1) and `KITCHEN` (Row 2) are flexed with `flex-nowrap`, dual-axis clamped (`min(vw, vh)`), and padded to guarantee visibility regardless of aspect ratio or browser scaling.

---

## 10. ANIMATION SYSTEM
- Powered by `motion/react` (Framer Motion) and `lenis` for smooth momentum scroll.
- Respects `prefers-reduced-motion: reduce`.
- Heavy animations (marquee, center kinetic tracks, and continuous transforms) run strictly on GPU via `will-change: transform; transform: translate3d(...)` to eliminate layout thrashing.

---

## 11. BOTTOM TYPOGRAPHY BEHAVIOR
- **Phase 12 & 13**: Counter-moving editorial tracks responding to scroll direction:
  - Track 1: `KAPITAL KITCHEN → → →`
  - Track 2: `← ← ← RAHIM YAR KHAN`
  - Uses `requestAnimationFrame` with smooth velocity dampening.
  - Scroll down: moves smoothly in one direction; Scroll up: moves in the opposite direction.
- **Phase 14**: Interactive bottom wordmark:
  - Full phrase **KAPITAL KITCHEN** on a single line.
  - Hover state: lights up in vibrant gold (`#EAB308`) with luminous ambient glow.
  - Click interaction: smooth scroll-to-top (`window.scrollTo({ top: 0, behavior: 'smooth' })`).

---

## 12. COMPONENT STRUCTURE
```
src/
├── App.tsx                     # Main layout orchestration & modal state
├── index.css                   # Tailwind v4 import & theme variables
├── main.tsx                    # React 19 entry point
├── assets/images/              # Verified real restaurant imagery
├── data/restaurantData.ts       # Single source of truth for menu & restaurant info
├── services/reservationService.ts # Sanitization, validation & API handler
├── server/
│   └── auth.ts                 # Bcrypt password hashing & HMAC-SHA256 token verification
└── components/
    ├── Navbar.tsx              # Adaptive floating header & mobile drawer (100% viewport contained)
    ├── HeroSection.tsx         # Hero with dual-axis typography & parallax
    ├── TypographicScrollIntro.tsx # Food / People / Moments kinetic showcase
    ├── BrandMomentSection.tsx  # Monumental counter-moving marquee & grill visual
    ├── FoodStorySection.tsx    # "MADE" -> "TO" -> "BE SHARED." editorial chapters
    ├── SignatureDishesSection.tsx # Tabbed culinary showcase with prep times
    ├── HorizontalMenuSection.tsx  # 7 menu chapters with swipe/scroll
    ├── CenterEditorialBranding.tsx # Central scroll-direction typography (KAPITAL KITCHEN / RAHIM YAR KHAN)
    ├── FlavourRevealSection.tsx   # Rising "FLAVOUR" mask over culinary visual
    ├── AtmosphereSection.tsx   # Interior architecture & "COME HUNGRY."
    ├── EditorialGallerySection.tsx # Asymmetric visual archive & lightbox triggers
    ├── LocationReservationSection.tsx # Live PKT clock, verified address & booking desk
    ├── Footer.tsx              # Scroll-direction tracks & interactive wordmark
    ├── CustomCursor.tsx        # Desktop-only smooth magnetic cursor
    ├── MenuModal.tsx           # Searchable full menu drawer
    ├── ReservationModal.tsx    # Interactive table booking modal
    ├── DishDetailModal.tsx     # Deep-dive culinary popup
    └── LightboxModal.tsx       # Fullscreen photo viewer
```

---

## 13. FRONTEND ARCHITECTURE
- **Framework**: React 19 + TypeScript.
- **Bundler**: Vite 8 with `@tailwindcss/vite` (Tailwind CSS v4).
- **Deployment Path**: Configured with `base: './'` in `vite.config.ts` for 100% static hosting compatibility on GitHub Pages or custom subdirectories.

---

## 14. BACKEND ARCHITECTURE
- **Server**: Node.js + Express (`server.ts`).
- **Payload Limit**: `10kb` limit on JSON parser and URL-encoded body parser to prevent memory exhaustion DOS.
- **Security Headers**: Custom middleware enforces `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-XSS-Protection: 1; mode=block`, and `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- **CORS Protection**: Restricted to `CORS_ORIGIN` in production with origin validation and method whitelisting.
- **Rate Limiting**: Sliding-window in-memory limiter:
  - Table reservations: max 10 requests / 15 minutes / IP.
  - Staff / Admin login: max 5 requests / 15 minutes / IP.
  - Automatic stale-entry garbage collection every 10 minutes.
- **Static Serving**: Express serves production `dist/` bundle automatically with clean SPA HTML5 routing fallback.

---

## 15. API ENDPOINTS & CONTRACTS

### Public Endpoints

#### `GET /api/health`
Returns minimal operational status without leaking system paths, secrets, or architecture details.

#### `POST /api/reservations`
**Request Payload**:
```json
{
  "name": "Tariq Malik",
  "phone": "0335 7357355",
  "guests": "2 Guests",
  "date": "2026-10-15",
  "time": "20:00",
  "notes": "Window booth preferred"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "referenceId": "KK-4821",
  "message": "Table reservation received successfully. Our host will confirm via SMS.",
  "data": {
    "guests": "2 Guests",
    "date": "2026-10-15",
    "time": "20:00"
  }
}
```

**Rate Limited Response (429 Too Many Requests)**:
```json
{
  "success": false,
  "message": "Too many reservation attempts. Please call us directly at 0335 7357355."
}
```

#### `GET /api/reservations/:refCode?phone=03357357355`
- **IDOR / BOLA Protected**: Requires customer's verified contact phone query parameter unless accessed by an authenticated staff token.
- Prevents malicious users from iterating through booking reference numbers.

---

### Staff & Admin Authentication Endpoints

#### `POST /api/auth/login`
- **Body**: `{ "username": "admin", "password": "..." }`
- **Brute-Force Protected**: 5 attempts per 15 minutes.
- **Enumeration Resistant**: Generic failure message `"Invalid credentials provided."` whether username or password was incorrect.
- **Password Verification**: Uses `bcrypt.compare` with cost factor 12.
- **Response**: `{ success: true, token: "...", user: { username: "admin", role: "admin" } }`

#### `GET /api/auth/me`
- Requires `Authorization: Bearer <token>`.
- Verifies HMAC-SHA256 signature using `crypto.timingSafeEqual` and unexpired timestamp.

#### `POST /api/auth/logout`
- Signals client-side session invalidation.

#### `GET /api/admin/reservations`
- Requires valid Admin Bearer token.
- Returns list of reservations for host floor coordination.

---

## 16. PASSWORD SECURITY & CRYPTOGRAPHY
- **Algorithm**: `bcryptjs` with salt rounds = 12 (intentionally expensive, unique salt per hash).
- **Plaintext Passwords**: Strictly prohibited. Passwords are never saved, logged, cached, or returned in API responses.
- **Tokens**: Base64url-encoded JSON payloads signed with HMAC-SHA256. Verified using constant-time buffer comparison (`crypto.timingSafeEqual`) to prevent timing side-channel attacks.
- **Session Expiration**: Default 8-hour token lifetime (`exp: now + 28800`).

---

## 17. DATABASE & PERSISTENCE
- **Current State**: In-memory thread-safe store with client-side graceful fallback for static CDN hosting.
- **Extensibility**: Compatible with MongoDB Atlas (Free M0 Tier). When adding a database connection:
  - Store URI in `MONGODB_URI` environment variable.
  - NEVER hardcode credentials.
  - Use Mongoose or native MongoDB driver with connection pooling.

---

## 18. ENVIRONMENT VARIABLES
See `.env.example` (clean public repository template with safe non-functional placeholders):
- `PORT`: Server port (defaults to `3000`).
- `NODE_ENV`: `production`.
- `APP_URL`: Host application URL (`https://your-domain.example`).
- `AUTH_SECRET`: Strong 256-bit secret string placeholder for HMAC token signing (`your_auth_secret_minimum_32_characters_here`).
- `ADMIN_USERNAME`: Admin login username placeholder (`your_admin_username`).
- `ADMIN_PASSWORD_HASH`: Non-functional bcrypt hash placeholder (`replace_with_generated_bcrypt_hash`).
- `CORS_ORIGIN`: Allowed production origins (`https://your-domain.example`).
- `MONGODB_URI`: Generic MongoDB connection string placeholder (`your_mongodb_connection_string`).

---

## 19. DEPLOYMENT CONFIGURATION
1. **GitHub Pages (Static Mode)**:
   ```bash
   npm run build
   # Push contents of dist/ to gh-pages branch
   ```
   *Verified*: Relative paths (`./assets/...`) resolve without 404 errors.
2. **Full-Stack Node.js (Docker / Render / Railway / Cloud Run)**:
   ```bash
   npm run build
   npm start # runs "tsx server.ts"
   ```

---

## 20. SECURITY REQUIREMENTS
- **No Secrets in Frontend**: Zero API keys, passwords, or credentials in client bundles.
- **XSS Prevention**: Inputs sanitized via `sanitizeText` (stripping `<>'"&`). React JSX handles output encoding automatically.
- **Request Size Limiting**: Express restricted to `10kb` body size.
- **No Evaluation**: Zero usage of `eval()`, `new Function()`, or `dangerouslySetInnerHTML`.
- **Security Headers**: Standard headers active across all responses.

---

## 21. PRIVACY REQUIREMENTS
- Customer names and phone numbers are strictly used for table reservations and SMS confirmation.
- Customer reservation details are NEVER exposed through public JSON files, localStorage, URL query parameters, or unprotected GET endpoints.
- Server logs emit only opaque reference codes and guest numbers (e.g. `[Reservation Received] Reference: KK-4821 | Guests: 2`), never personal contact numbers.

---

## 22. PERFORMANCE REQUIREMENTS
- Initial JS bundle gzip: ~212 kB.
- Images: Pre-optimized WebP/JPEG assets with lazy loading.
- Scroll listeners: Marked with `{ passive: true }` and throttled via `requestAnimationFrame`.

---

## 23. ACCESSIBILITY REQUIREMENTS
- Keyboard navigable: Modals dismiss on `Escape` key, interactive buttons have focus outlines.
- Touch targets: Minimum 44x44px for primary mobile tap targets.
- Screen readers: Descriptive `alt` attributes on all culinary images and `aria-label` attributes on icon-only buttons.
- Reduced Motion: Lenis momentum scroll and intensive transforms respect `(prefers-reduced-motion: reduce)`.

---

## 24. SEO REQUIREMENTS
- Valid semantic `<title>` and `<meta name="description">` in `index.html`.
- Open Graph tags (`og:title`, `og:description`, `og:type`) configured for rich sharing previews.
- Twitter Card metadata configured.

---

## 25. KNOWN INTENTIONAL DESIGN DECISIONS
1. **No Video Hero**: Real high-resolution photography is intentionally chosen for instant mobile load speed and authentic texture.
2. **No RGB / Gaming Glows**: The aesthetic strictly adheres to warm amber/gold and natural charcoal embers.
3. **No Fake Reviews or Badges**: Zero fabricated 5-star badges or synthetic testimonials.
4. **Single-line Wordmark**: `KAPITAL KITCHEN` in hero and footer is designed to exist on a unified horizon.

---

## 26. THINGS THAT MUST NOT BE CHANGED
- **Restaurant Location**: Must remain `C8F6+9MF, Modal Town, Rahim Yar Khan, Punjab 64200, Pakistan`.
- **Restaurant Phone**: Must remain `0335 7357355` (`+92 335 7357355`).
- **Real Food Images**: Never replace with generic stock images.
- **Interactive Bottom Hover**: Yellow illumination on the footer wordmark.

---

## 27. HOW TO SAFELY MODIFY THE WEBSITE
1. Make atomic, single-responsibility changes.
2. Update `restaurantData.ts` if menu items or operational hours change.
3. Run `npm run lint` and `npm run build` after any edit.
4. Test at 320px, 768px, and 1440px to verify that typography and buttons adapt without clipping.

---

## 28. HOW TO DIAGNOSE RESPONSIVE BUGS
- If a horizontal scrollbar appears:
  Run `document.documentElement.scrollWidth > window.innerWidth` in DevTools console.
  Inspect elements exceeding viewport width using:
  ```js
  document.querySelectorAll('*').forEach(el => {
    if (el.offsetWidth > document.documentElement.offsetWidth) console.log(el);
  });
  ```
- If text is clipped vertically on mobile landscape:
  Ensure typography uses `min(vw, vh)` clamps rather than purely `vw` units.

---

## 29. HOW TO DIAGNOSE API BUGS
- If reservations return 429: Check rate limiter window in `server.ts`.
- If reservations fail on GitHub Pages: This is normal for static hosts; verify that `reservationService.ts` provides instant fallback confirmation.

---

## 30. HOW TO DIAGNOSE DEPLOYMENT BUGS
- If assets return 404: Verify `base: './'` is set in `vite.config.ts`.
- If Linux server fails on imports: Verify case sensitivity of asset filenames (e.g. `.jpg` vs `.JPG`).

---

## 31. HOW TO TEST BEFORE DEPLOYMENT
```bash
# 1. Type check
npm run lint

# 2. Production build
npm run build

# 3. Preview static build locally
npm run preview
```

---

## 32. FINAL PRE-GITHUB & PRE-CLIENT QA CHECKLIST
- [x] Website builds successfully (`vite build` in ~1.05s).
- [x] Website opens and executes cleanly with 0 console errors.
- [x] Top Navbar fits without clipping or overflow on all screens (320px to 3840px).
- [x] "BOOK TABLE" CTA is completely visible and touch-accessible.
- [x] All right-side buttons stay strictly inside viewport.
- [x] KAPITAL KITCHEN hero title is 100% visible on every device without height clipping.
- [x] Center animated typography active (`KAPITAL KITCHEN` / `RAHIM YAR KHAN`) responding to scroll direction.
- [x] Bottom interactive KAPITAL KITCHEN wordmark fully visible with yellow hover and smooth scroll to top.
- [x] Verified location is Modal Town, Rahim Yar Khan (`C8F6+9MF`).
- [x] Verified phone is `0335 7357355` (`tel:+923357357355`).
- [x] Zero references to Abbasia or old phone numbers.
- [x] Password security: bcrypt hashing with cost factor 12 implemented.
- [x] No plaintext passwords stored, logged, or returned in API responses.
- [x] IDOR / BOLA protected: reservations cannot be enumerated without phone verification.
- [x] Rate limiting active on reservations and authentication.
- [x] Request body size restricted to 10kb.
- [x] Security headers active (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`).
- [x] Safe error handling: zero stack traces, server paths, or queries returned to client.
- [x] Sensitive logging prevented: customer phone numbers and names excluded from logs.
- [x] Environment template `.env.example` contains only safe placeholders.
- [x] `.gitignore` comprehensive against `.env*` and logs.
- [x] Secret audit passed: zero keys, tokens, or personal paths in repository.
- [x] Asset filename case audit passed on Linux.
- [x] Dependency conflict resolution: removed conflicting `esbuild ^0.25.0` pin to match `vite@8.3.1` requirement (`^0.28.2`).
- [x] Both `package-lock.json` and `bun.lock` synchronized without `--force` or `--legacy-peer-deps`.
- [x] GPU kinetic typography refactored to direct ref style transforms (0 state re-renders/sec).
- [x] Modal accessibility: Escape key navigation enabled across all modals.

---

## 33. DEPENDENCY & LOCKFILE ARCHITECTURE
- **Vite & esbuild Compatibility**: `vite@8.3.1` specifies peerOptional `esbuild@^0.27.0 || ^0.28.0`.
  - Never add an outdated `esbuild` version (e.g. `^0.25.0`) to `devDependencies`.
  - Vite automatically bundles and manages its own compatible esbuild binary (`esbuild@0.28.2`).
- **Synchronized Lockfiles**:
  - `package-lock.json`: Generated via clean `npm install` without `--force` or `--legacy-peer-deps`.
  - `bun.lock`: Synchronized via `bun install`.
  - Ensures seamless setup whether developer uses `npm install` or `bun install`.

