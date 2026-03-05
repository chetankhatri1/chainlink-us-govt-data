# Atlas Labs Website

The production website for [Atlas Labs](https://atlas-labs.ai) — an applied AI, data engineering, and agentic systems practice.

Built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, and deployed on **Vercel**.

---

## Local development

### Prerequisites

- Node.js 20+
- npm 10+ (or pnpm / yarn)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/chetankhatri1/atlas-ai-website.git
cd atlas-ai-website

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local
# Edit .env.local — see "Environment variables" section below

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Hot reload is on by default.

### Other commands

```bash
npm run build        # Production build
npm run start        # Serve the production build locally
npm run lint         # ESLint
npm run type-check   # TypeScript type check (no emit)
```

---

## Project structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Header, Footer, ThemeProvider)
│   ├── page.tsx                # Home page (/)
│   ├── globals.css             # Global styles + Tailwind directives
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt via Next.js
│   ├── capabilities/
│   │   └── page.tsx            # /capabilities
│   ├── lab-notes/
│   │   ├── page.tsx            # /lab-notes (blog index)
│   │   ├── LabNotesList.tsx    # Client component: search + filter
│   │   └── [slug]/
│   │       └── page.tsx        # /lab-notes/[slug] (individual post)
│   ├── about/
│   │   └── page.tsx            # /about
│   ├── contact/
│   │   ├── page.tsx            # /contact
│   │   └── ContactForm.tsx     # Client component: contact form
│   └── api/
│       └── contact/
│           └── route.ts        # POST /api/contact (email or stub)
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav with mobile menu
│   │   └── Footer.tsx          # Footer with social links
│   ├── ui/
│   │   ├── Button.tsx          # Polymorphic button (renders <button> or <Link>)
│   │   ├── Card.tsx            # Card, CardHeader, CardTitle, CardDescription
│   │   ├── Badge.tsx           # Inline tag/label component
│   │   ├── Section.tsx         # Section wrapper + SectionHeader
│   │   └── Container.tsx       # Max-width container
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── CapabilitiesSection.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── LabNotesTeaser.tsx
│   │   └── ContactCTA.tsx
│   ├── ThemeProvider.tsx       # next-themes wrapper
│   └── ThemeToggle.tsx         # Dark/light toggle button
├── content/
│   └── lab-notes/              # MDX blog posts (add new posts here)
│       ├── rag-in-the-real-world.mdx
│       ├── entity-resolution-financial-instruments.mdx
│       └── agent-workflows-that-dont-break.mdx
└── lib/
    ├── mdx.ts                  # Read and parse MDX posts from filesystem
    └── utils.ts                # Shared utilities (formatDate, cn)
```

---

## Deploying to Vercel

### First-time setup

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link this repo to Vercel (run from project root)
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

Or connect directly in the Vercel dashboard:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Add environment variables (see below)
5. Deploy

### Custom domain

In the Vercel dashboard → your project → **Settings → Domains**, add `atlas-labs.ai`. Vercel will provide DNS records to configure at your registrar.

---

## Environment variables

Copy `.env.example` to `.env.local` for local dev. In Vercel, set these under **Settings → Environment Variables**.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Full URL of the site, e.g. `https://atlas-labs.ai`. Used for sitemap and OpenGraph metadata. |
| `SMTP_HOST` | Optional | SMTP server host for contact form emails |
| `SMTP_PORT` | Optional | SMTP port (default: `587`) |
| `SMTP_USER` | Optional | SMTP username / sender email |
| `SMTP_PASS` | Optional | SMTP password |
| `CONTACT_TO_EMAIL` | Optional | Recipient email for contact form submissions |

### Contact form behaviour

- **If SMTP env vars are set**: form submissions are sent as emails via nodemailer.
- **If SMTP env vars are not set**: submissions are logged to the server console (visible in Vercel logs). Useful for testing without an email provider.

For production email delivery, any SMTP-compatible provider works: Postmark, SendGrid, Resend, Gmail SMTP, etc.

---

## Adding a new Lab Note post

1. Create a new `.mdx` file in `src/content/lab-notes/`:

```bash
touch src/content/lab-notes/my-new-post.mdx
```

2. Add frontmatter at the top of the file:

```mdx
---
title: "Your post title"
date: "2025-04-01"
excerpt: "A one or two sentence summary shown on the index page and in metadata."
tags: ["RAG", "Data quality"]
author: "Atlas Labs"
---

Your MDX content here. You can use standard Markdown, plus JSX components.

## Heading

Code blocks with syntax highlighting:

```python
def hello():
    print("hello, world")
```

## Another section

More content...
```

3. The post will appear automatically on `/lab-notes`, sorted by date (newest first). The slug is derived from the filename.

### Supported frontmatter fields

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Post title |
| `date` | Yes | Publication date (`YYYY-MM-DD`) |
| `excerpt` | Yes | Short summary for index and metadata |
| `tags` | Yes | Array of tag strings for filtering |
| `author` | No | Author name (defaults to hidden) |

---

## SEO

- **Metadata**: set per-page via Next.js `generateMetadata` / `metadata` export
- **OpenGraph**: configured in `src/app/layout.tsx`; place an `og-image.png` (1200×630) in `/public/` for social previews
- **Sitemap**: auto-generated at `/sitemap.xml` by `src/app/sitemap.ts`
- **Robots**: auto-generated at `/robots.txt` by `src/app/robots.ts`

---

## Tech stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 15 | Framework (App Router, RSC, API routes) |
| [TypeScript](https://typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Styling |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.3 | Dark mode toggle with persistence |
| [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) | 5 | MDX rendering in App Router RSC |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | 4 | Frontmatter parsing |
| [remark-gfm](https://github.com/remarkjs/remark-gfm) | 4 | GitHub Flavored Markdown |
| [rehype-highlight](https://github.com/rehypejs/rehype-highlight) | 7 | Code syntax highlighting |
| [rehype-slug](https://github.com/rehypejs/rehype-slug) | 6 | Heading anchor IDs |
| [Vercel](https://vercel.com) | — | Hosting + edge functions |
