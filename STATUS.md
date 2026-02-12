# Website Factory — STATUS.md

> Copy this file into each project repo. Tell Claude Code to update it at the end of every session.

## Quick Status

- **Project:** Website Factory
- **Current session:** 4 of TBD
- **Last updated:** 2026-02-12
- **Overall health:** 🟢 On track — email notifications, auth middleware, dynamic theming, 25 routes, zero TS errors

---

## What's Working

- Config-driven template system (config/site.json drives entire site)
- **Dynamic theme system** — CSS custom properties injected at runtime from config (swap JSON, entire color scheme changes)
- Next.js 14 App Router with TypeScript (strict mode)
- Tailwind CSS with CSS custom properties from config theme
- Prisma ORM with SQLite (Registration, ContactSubmission, CalendarEvent, AdminUser models)
- Landing page (Hero, StatsBar, ProgramCards, Testimonials, CallToAction)
- About page (coach bio, mission, values grid)
- Programs page (all 4 programs from config with details)
- Schedule page (server component fetches events from DB)
- Contact page (form wired to /api/contact with validation)
- FAQ page (accordion with 10 questions from config)
- Register page (form wired to /api/register with full validation)
- **Registration form → /api/register** (POST, saves to DB, email validation, loading state, success/error feedback)
- **Contact form → /api/contact** (POST, saves to DB, email + message length validation, loading state)
- **Server-side email validation** on both register and contact APIs
- **Email notifications** (Resend integration with console fallback when no API key)
  - Registration confirmation email to parent
  - New registration notification to admin
  - Contact confirmation email to visitor
  - New contact notification to admin
  - Branded HTML templates using config theme colors and business info
- **Admin auth middleware** (NextAuth middleware protects /admin/* and /api/admin/* routes, redirects to /admin/login)
- **SessionProvider** wraps app via Providers component
- **Admin dashboard with real data** (registration count, unread messages, upcoming events, active programs, recent items)
- **Admin registrations page with real data** (table, status actions, CSV export)
- **Admin messages page with real data** (messages, read/unread, mark-as-read)
- **Admin calendar page** (full CRUD — add, delete events)
- **Admin settings page** (profile update, password change with bcrypt)
- Admin login page (NextAuth credentials provider)
- 11 API routes (register, contact, waiver, admin/registrations, admin/events, admin/messages, admin/export, admin/profile, admin/password, auth)
- Config-driven navigation (only shows enabled pages)
- Mobile-responsive header with hamburger menu
- Footer with business info from config
- shadcn/ui components (Button, Card, Accordion, Input, Label, Select, Textarea, Badge, Separator)
- GitHub repo (github.com/kjhholt-alt/website-factory)
- **Dental practice example config** (config/examples/dental-practice.json — proves config swap)
- **Vercel deployment config** (vercel.json, standalone output, env docs)
- Production build passes (25/25 pages, zero errors)
- TypeScript compiles with zero errors

## What's Broken / Incomplete

- No payments/Stripe integration
- Not yet deployed to Vercel
- Mobile responsive needs visual verification
- Event edit functionality (can create and delete, but not edit)
- Email notifications untested with real Resend API key (console fallback works)

---

## Last Session Summary

**Date:** 2026-02-12
**Goal:** Session 4 — Email notifications, auth middleware, dynamic theming, deployment prep

**What got done:**
- Email notification system (lib/email.ts + lib/email-templates.ts)
  - Resend integration with graceful console fallback when no API key
  - 4 email templates: registration confirmation, registration admin notify, contact confirmation, contact admin notify
  - Branded HTML templates using config theme colors and business info
  - Non-blocking Promise.allSettled in register and contact API routes
- Admin auth middleware (middleware.ts)
  - NextAuth withAuth middleware protecting /admin/* and /api/admin/* routes
  - Redirects unauthenticated users to /admin/login
- SessionProvider (components/Providers.tsx) wraps app in layout.tsx
- Dynamic theme system
  - CSS custom properties injected at runtime from config in layout.tsx
  - globals.css uses CSS variables for gradients and theme colors
  - Swap config/site.json → entire site color scheme changes
- Dental practice example config (config/examples/dental-practice.json)
  - Blue theme (#0369A1), different business, programs, testimonials, FAQ
  - Proves the config-driven template system works for any business type
- Vercel deployment prep (vercel.json, standalone output, unoptimized images)
- Updated .env.example with RESEND_API_KEY and EMAIL_DOMAIN
- Production build: 25/25 pages + middleware, zero TypeScript errors

**What didn't get done (and why):**
- Vercel deployment (user said "we wont deploy yet")
- Event edit functionality (deferred)
- Visual responsive testing (deferred to deployment)
- Real Resend email testing (needs API key in production)

**Bugs found:**
- None — clean build, zero TS errors

**Decisions made:**
- Resend with console fallback (no hard dependency on API key for dev)
- NextAuth withAuth middleware (simple, built-in to next-auth)
- Runtime CSS custom properties for theme (no build-time color injection needed)
- Non-blocking email sends (Promise.allSettled, don't block API response)

---

## Next Session Plan

**Goal:** Session 5 — Second client template to prove config swap

**What to do:**
- Copy dental-practice.json to config/site.json and verify site fully transforms
- Visual testing of both themes (soccer + dental) in browser
- Mobile responsive verification
- Fix any visual issues from config swap
- Consider restaurant or fitness studio as third config example
- Deploy to Vercel with Postgres
- Test email notifications with real Resend API key

---

## Architecture Decisions Log

| Date | Decision | Why | Alternative Considered |
|------|----------|-----|------------------------|
| 2026-02-12 | Config-driven JSON template | One codebase, infinite client sites | Hardcoded per-client |
| 2026-02-12 | SQLite for dev, Postgres for prod | Fast local development | Postgres everywhere |
| 2026-02-12 | NextAuth credentials for admin | Simple, no external OAuth needed | Clerk, Auth0 |
| 2026-02-12 | shadcn/ui components | Customizable, no vendor lock-in | Material UI, Chakra |
| 2026-02-12 | No Stripe for initial build | Launch faster, validate template system | Build payments now |
| 2026-02-12 | Server components for admin pages | Direct DB access, less client JS, faster loads | Client components with API fetch |
| 2026-02-12 | Client action components in server pages | Interactive buttons without full page client-side | Full client page with useEffect fetch |
| 2026-02-12 | Inline form for event creation | Simpler UX, no modal complexity | Dialog/modal form |
| 2026-02-12 | bcrypt for admin passwords | Industry standard, secure | Plain text (never) |
| 2026-02-12 | Resend for email with console fallback | No hard API key dependency for dev | SendGrid, Nodemailer |
| 2026-02-12 | NextAuth withAuth middleware | Built-in, simple route protection | Custom middleware |
| 2026-02-12 | Runtime CSS custom properties for theme | Swap config → colors change, no rebuild | Build-time Tailwind config |
| 2026-02-12 | Non-blocking email sends | Don't slow down API responses | Await emails before responding |

---

## Environment Notes

- **OS:** Windows 11 + Git Bash
- **Node version:** 24.13.0
- **Deploy target:** Vercel
- **Database:** SQLite (dev) / Postgres (prod)
- **Key env vars:** DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, RESEND_API_KEY, EMAIL_DOMAIN
- **Local path:** C:\Users\GQETCUM\Desktop\Projects\website-factory
- **GitHub:** github.com/kjhholt-alt/website-factory
- **gh CLI:** /tmp/gh_extracted/bin/gh.exe (portable install, authenticated as kjhholt-alt)

---

## Session History

| # | Date | Goal | Result | Notes |
|---|------|------|--------|-------|
| 1 | 2026-02-12 | Template system + first client site | ✅ | 47 files, 22 routes, zero TS errors, clean build |
| 2 | 2026-02-12 | Forms API wiring + admin data | ✅ | Forms POST to APIs, server validation, admin shows real DB data, GitHub repo created |
| 3 | 2026-02-12 | Full admin CRUD + calendar + CSV + seed | ✅ | 25 routes, event CRUD, registration actions, CSV export, admin seed, zero TS errors |
| 4 | 2026-02-12 | Email notifications + auth + theme + deploy prep | ✅ | Resend email system, NextAuth middleware, dynamic CSS theming, dental config example, vercel.json, 25/25 build |
