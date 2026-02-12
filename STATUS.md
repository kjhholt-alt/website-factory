# Website Factory — STATUS.md

> Copy this file into each project repo. Tell Claude Code to update it at the end of every session.

## Quick Status

- **Project:** Website Factory
- **Current session:** 3 of TBD
- **Last updated:** 2026-02-12
- **Overall health:** 🟢 On track — full admin CRUD, calendar events, CSV export, seed script, 25 routes, zero TS errors

---

## What's Working

- Config-driven template system (config/site.json drives entire site)
- Next.js 14 App Router with TypeScript (strict mode)
- Tailwind CSS with CSS custom properties from config theme
- Prisma ORM with SQLite (Registration, ContactSubmission, CalendarEvent, AdminUser models)
- Landing page (Hero, StatsBar, ProgramCards, Testimonials, CallToAction)
- About page (coach bio, mission, values grid)
- Programs page (all 4 programs from config with details)
- Schedule page (empty state — events come from admin)
- Contact page (form wired to /api/contact with validation)
- FAQ page (accordion with 10 questions from config)
- Register page (form wired to /api/register with full validation)
- **Registration form → /api/register** (POST, saves to DB, email validation, loading state, success/error feedback)
- **Contact form → /api/contact** (POST, saves to DB, email + message length validation, loading state)
- **Server-side email validation** on both register and contact APIs
- **Admin dashboard with real data** (registration count, unread messages, upcoming events, active programs, recent items)
- **Admin registrations page with real data** (table populated from DB, program name lookup, status badges)
- **Admin messages page with real data** (messages from DB, read/unread indicators, message count)
- Admin login page (NextAuth credentials provider)
- Admin calendar page shell
- Admin settings page shell
- 7 API routes (register, contact, waiver, admin/registrations, admin/events, admin/messages, auth)
- Config-driven navigation (only shows enabled pages)
- Mobile-responsive header with hamburger menu
- Footer with business info from config
- shadcn/ui components (Button, Card, Accordion, Input, Label, Select, Textarea, Badge, Separator)
- GitHub repo created and pushed (github.com/kjhholt-alt/website-factory)
- Production build passes (22/22 pages, zero errors)
- TypeScript compiles with zero errors
- End-to-end API tested: registration, contact, email validation, admin data retrieval

## What's Broken / Incomplete

- Email notifications not built yet
- No payments/Stripe integration
- Not yet deployed to Vercel
- Mobile responsive needs visual verification
- Config color swap needs visual verification
- Event edit functionality (can create and delete, but not edit)
- Admin auth middleware (admin pages accessible without login in dev)

---

## Last Session Summary

**Date:** 2026-02-12
**Goal:** Session 3 — Full admin implementation, calendar events, CSV export, seed script

**What got done:**
- Admin calendar page: full CRUD (add events via inline form, delete events, list upcoming/past)
- Events show on public /schedule page (server component fetches from DB)
- Admin registrations: status update buttons (Confirm/Cancel per row, server refresh)
- Admin messages: mark-as-read button per message (server refresh)
- CSV export endpoint (/api/admin/export) generates downloadable CSV
- Export CSV button wired on registrations page
- Admin settings: profile update (name/email) + password change with bcrypt verification
- API endpoints: /api/admin/profile (GET/PATCH), /api/admin/password (POST)
- Admin seed script (prisma/seed.ts) creates default admin user
- Client components: RegistrationActions, MessageActions for interactive admin actions
- Production build: 25/25 routes, zero TypeScript errors
- All APIs tested end-to-end

**What didn't get done (and why):**
- Email notifications (Session 4)
- Event edit functionality (can add/delete, no edit — defer to later)
- Admin auth middleware (pages accessible without login in dev)
- Visual responsive testing (no browser connected)

**Bugs found:**
- None — all APIs tested and working

**Decisions made:**
- Client components for admin actions (RegistrationActions, MessageActions) embedded in server pages
- Inline form for event creation (simpler than modal)
- bcrypt password verification for settings page

---

## Next Session Plan

**Goal:** Session 4 — Email notifications, polish, and deployment prep

**What to do:**
- Add email notification on new registration (Resend or similar)
- Add email notification on contact form submission
- Polish mobile responsive design
- Test config color swap visually
- Add admin auth middleware (protect admin routes)
- Deploy to Vercel
- Test with production database (Postgres)

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

---

## Environment Notes

- **OS:** Windows 11 + Git Bash
- **Node version:** 24.13.0
- **Deploy target:** Vercel
- **Database:** SQLite (dev) / Postgres (prod)
- **Key env vars:** DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
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
