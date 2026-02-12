# Website Factory

Config-driven website template system. One codebase, infinite client sites. Change a JSON config file and the entire site transforms.

## First Client: Elite Soccer Academy

A professional website for a youth soccer coaching business featuring:
- Landing page with hero, programs, testimonials, stats
- Program listings with registration
- Contact form
- FAQ section
- Admin dashboard for managing registrations, events, and messages

## How It Works

Edit `config/site.json` to change:
- Business name, tagline, contact info
- Theme colors (primary/secondary)
- Which pages are enabled
- Programs/services offered
- Content (hero text, FAQs, testimonials, etc.)

The entire site reads from this config — zero hardcoded business content.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Prisma ORM + SQLite (dev) / Postgres (prod)
- **Auth:** NextAuth.js v4 (credentials provider)

## Getting Started

```bash
npm install
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
config/site.json          # Site configuration (drives everything)
lib/config.ts             # Typed config reader
lib/db.ts                 # Prisma client
app/                      # Next.js App Router pages
  page.tsx                # Home (landing page)
  about/                  # About page
  programs/               # Programs listing
  schedule/               # Event calendar
  register/               # Registration form
  contact/                # Contact form
  faq/                    # FAQ accordion
  admin/                  # Admin dashboard
  api/                    # API routes
components/
  layout/                 # Header, Footer, MobileNav
  home/                   # Hero, StatsBar, ProgramCards, etc.
  forms/                  # RegistrationForm, ContactForm
  ui/                     # shadcn/ui components
prisma/schema.prisma      # Database schema
```

## License

MIT
