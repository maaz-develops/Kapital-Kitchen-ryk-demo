# Kapital Kitchen — Rahim Yar Khan

> **Good Food. Good Mood.**  
> An editorial, typography-driven digital experience and web application representing the authentic **Kapital Kitchen** steakhouse, burger, woodfired pizza, and cafe establishment situated in **Modal Town, Rahim Yar Khan, Punjab, Pakistan**.

---

## 🍽️ Verified Restaurant Information

* **Establishment**: Kapital Kitchen
* **Location**: `C8F6+9MF, Modal Town, Rahim Yar Khan, Punjab 64200, Pakistan`
* **Direct Phone**: `0335 7357355` (`+92 335 7357355`)
* **Hours**: Daily 12:00 PM – 02:00 AM PKT
* **Specialties**: Charcoal-fire steaks, artisan smash burgers, blistered woodfired pizzas, loaded fries, molten desserts, and speciality coffee.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v18.0.0 or later (Node 20+ recommended)
* **npm**: v9+ (or **Bun** v1.0+)

### 1. Installation
Clone or extract the repository and install dependencies cleanly:

```bash
# Using npm
npm install

# Or using Bun
bun install
```

> **Note**: Dependency compatibility has been verified. Do NOT use `--force` or `--legacy-peer-deps`. Both `package-lock.json` and `bun.lock` are fully synchronized.

### 2. Environment Setup
Copy the production environment template:

```bash
cp .env.example .env
```

Edit `.env` to configure your server parameters:
* `PORT`: Server port (default: `3000`)
* `AUTH_SECRET`: Strong 256-bit random secret string for session HMAC signing
* `ADMIN_USERNAME`: Admin desk username (default: `admin`)
* `ADMIN_PASSWORD_HASH`: Pre-computed bcrypt hash of admin password
* `CORS_ORIGIN`: Allowed production origins
* `MONGODB_URI`: Optional MongoDB connection string

### 3. Development Mode
Start the local development server:

```bash
npm run dev
# Server starts at http://localhost:3000
```

### 4. Production Build & Verification
Compile TypeScript and bundle client assets with Vite:

```bash
# Type check & lint
npm run lint

# Compile production bundle
npm run build
```

Production assets are compiled into the `dist/` directory with relative asset paths (`./assets/...`), making it 100% compatible with both static hosting (GitHub Pages) and full-stack Node.js servers.

### 5. Running Full-Stack Production Server
Start the Express backend serving production assets and APIs:

```bash
npm start
```

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | Modular, hook-driven, strictly typed |
| **Styling** | Tailwind CSS v4 | `@tailwindcss/vite` modern CSS engine |
| **Typography** | Syne & Plus Jakarta Sans | Dual-axis responsive clamp `min(vw, vh)` |
| **Motion** | `motion/react` + Lenis | GPU-accelerated kinetic typography with zero layout shift |
| **Icons** | Lucide React | Lightweight SVG iconography |
| **Backend** | Node.js + Express (`server.ts`) | Sliding-window rate limiter, security headers, 10kb body limit |
| **Security** | `bcryptjs` + HMAC-SHA256 | Bcrypt cost factor 12, timing-safe equality token verification |
| **Storage** | In-Memory + MongoDB Ready | Thread-safe store with client-side fallback for static CDNs |

---

## 🔒 Security & Privacy Highlights

* **No Secrets in Frontend**: Zero API keys, passwords, or tokens in client bundles.
* **Bcrypt Password Hashing**: Passwords hashed with unique salts and cost factor 12. No plaintext passwords stored, cached, or logged.
* **IDOR / BOLA Prevention**: Table reservations require customer contact verification to view details; cannot be scraped by iterating reference codes.
* **Rate Limiting**:
  - Reservation bookings: max 10 requests / 15 minutes / IP.
  - Staff / Admin login: max 5 requests / 15 minutes / IP.
* **Security Headers**: Standard headers active (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`).
* **Customer Privacy**: Contact details used exclusively for table confirmation. Server logs emit only opaque references (`KK-XXXX`), never customer numbers.

---

## 📖 Maintenance & Runbook

For complete architectural details, design constitution, responsive breakpoints (320px – 3840px), diagnostic procedures, and regression testing protocols, refer to:

👉 **[`KAPITAL-KITCHEN-MAINTENANCE.md`](./KAPITAL-KITCHEN-MAINTENANCE.md)**

---

## 📄 License
Private & Confidential — Created for Kapital Kitchen, Rahim Yar Khan.
