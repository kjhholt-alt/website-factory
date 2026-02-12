# Website Factory — STATUS.md

> Copy this file into each project repo. Tell Claude Code to update it at the end of every session.

## Quick Status

- **Project:** Website Factory
- **Current session:** 2 of TBD
- **Last updated:** 2026-02-12
- **Overall health:** 🟢 On track — forms wired to APIs, admin shows real data, production build passes, zero TS errors

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

- Admin calendar full implementation (add/edit events)
- Admin settings (profile update, password change)
- Email notifications not built yet
- No payments/Stripe integration
- Not yet deployed to Vercel
- Mobile responsive needs visual verification
- Config color swap needs visual verification
- CSV export not wired up yet

---

## Last Session Summary

**Date:** 2026-02-12
**Goal:** Session 2 — Forms API integration, validation, admin data wiring

**What got done:**
- Registration form wired to /api/register (async POST, loading state, error handling, field reset on success)
- Contact form wired to /api/contact (async POST, loading state, error handling, field reset on success)
- Server-side email validation added to both register and contact APIs
- Server-side message length validation on contact API
- Admin dashboard converted to server component with real DB stats (registrations, messages, events, programs)
- Admin registrations page converted to server component showing real DB records with program name lookup
- Admin messages page converted to server component showing real contact submissions with read/unread indicators
- GitHub repo created (kjhholt-alt/website-factory) and code pushed
- PROJECTS.md updated in project-docs repo with Website Factory entry
- End-to-end API testing passed (registration creates DB record, contact saves, email validation rejects bad format, admin endpoints return real data)
- Production build: 22/22 routes, zero TypeScript errors

**What didn't get done (and why):**
- Admin calendar event management (Session 3)
- Admin settings functionality (Session 3)
- Email notifications (Session 4)
- Visual responsive testing (no browser connected)
- CSV export (Session 3)

**Bugs found:**
- None — all APIs tested and working

**Decisions made:**
- Server components for admin pages (better for data fetching, no client JS needed)
- Simple email regex validation (sufficient for MVP)

---

## Next Session Plan

**Goal:** Session 3 — Admin full implementation + calendar events

**What to do:**
- Wire admin calendar page (add/edit/delete events, show in public schedule page)
- Wire admin settings page (profile update, password change)
- Add CSV export for registrations
- Wire registration status updates (confirm/cancel from admin)
- Wire message mark-as-read from admin
- Add admin seed script (create default admin user)
- Test full admin workflow end-to-end

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
