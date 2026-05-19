# Migration Plan: hellolahome → Sharon's Site Structure

## Context
Eric wants to restructure `/hellolahome` to match the folder structure and page layout of Sharon's site (`/sharon-real-estate/site`), which was built with more care and time. His Sanity CMS data (neighborhoods, sold properties, services content, blog posts) stays — only the structure, formatting, and component patterns change. He also needs the contact form wired up with SendGrid (matching Sharon's implementation) in anticipation of a domain migration from Squarespace to Vercel.

---

## Progress Log

**2026-05-19 — Completed:**
- ✅ `src/config/agent.ts` — added `address`, `hours`, `expSite`; removed `brokerageDre`
- ✅ `src/app/(marketing)/about/page.tsx` — added breakout quote section (Sharon's layout, Eric's name)
- ✅ `src/components/contact/ContactForm.tsx` — replaced with Sharon's version (`dark`, `submitLabel`, `messagePlaceholder` props; raw HTML inputs; honeypot wired correctly)
- ✅ `src/app/(marketing)/blog/[slug]/page.tsx` — replaced PortableText renderer with Sharon's manual block walker (image captions, internal property links, lists)
- ✅ `src/app/api/revalidate/route.ts` — created ISR revalidation route for Sanity webhooks (no `/reviews` path)
- ✅ `next.config.ts` — redirects already present for `/sold`, `/neighborhoods`, `/services`
- ✅ Sanity queries already project correct label fields for `PrevNextNav`

**Skipped (Eric's site won't have these):**
- ❌ `/reviews` page, `ReviewCard`, `VideoTestimonial`
- ❌ `TypebotWidget` / `@typebot.io/react`
- ❌ `REVIEWS_QUERY`
- ❌ TypebotWidget in root `layout.tsx`

**Still to do (see phases below):**
- Add `SANITY_REVALIDATE_SECRET` to `.env.local` and Vercel env vars, then configure Sanity webhook
- All remaining structural phases (route renames, component copies, page reformats, SendGrid, domain)

---

## Pre-flight Decisions (resolve before starting)

1. **Services split:** Split `/services` into `/buying` + `/selling` (Sharon's pattern), or keep a single `/services` page? Later phases assume split — must decide first.
2. **Email provider:** SendGrid (Sharon's, fully implemented) vs. keep Resend (already installed, not wired)?
3. **Reviews page:** Not in Eric's four content areas — skip unless noted otherwise.

---

## Structural Diff: hellolahome vs. Sharon's Site

| Area | hellolahome (current) | Sharon's site (target) |
|---|---|---|
| Route: properties | `/sold` | `/properties` |
| Route: neighborhoods | `/neighborhoods` | `/local-guide` |
| Route: services | `/services` (single) | `/buying` + `/selling` (split) |
| Email | Resend installed, not wired | SendGrid, fully wired |
| Config: hero images | inline in HeroEditorial | `/src/config/hero.ts` |
| Config: nav links | inline in Nav.tsx | `/src/config/navLinks.ts` |
| Services component | none | `ProcessAccordion.tsx` |
| Stats component | none | `StatsSection.tsx` |
| Detail page nav | none | `PrevNextNav.tsx` (needs label fields in queries) |
| Animation easing | `src/lib/motion.ts` | `src/lib/ease.ts` |
| CSS: container-site | missing | defined in `globals.css` |
| CSS: section-py | missing | defined in `globals.css` |
| CSS: hover-underline | missing | defined in `globals.css` |
| Color: charcoal | #3b3932 | #1a1919 (darker) |
| Color: sand | missing | #f2f0e9 |
| Sanity: property price | no `price` field | has `price` field |
| Sanity: property city | no `city` field | has `city` field (used in card layouts) |
| Sanity: neighborhood order | no `order` field | has `order` field |

---

## Phase 1 — Verify Baseline
Before touching any code:
- Confirm `.env.local` contains `NEXT_PUBLIC_SANITY_PROJECT_ID=r9ttxibv`
- Run `npm run dev` — existing pages load without errors
- Confirm `src/app/page.tsx` (the root) redirects to `src/app/(marketing)/page.tsx` (the actual homepage) — both files exist and must both be updated

---

## Phase 2 — Route Restructuring

**Rename directories (git mv):**
- `src/app/(marketing)/sold/` → `src/app/(marketing)/properties/`
- `src/app/(marketing)/neighborhoods/` → `src/app/(marketing)/local-guide/`
- Delete `src/app/(marketing)/services/page.tsx` → content moves to `/buying` + `/selling`

**Add permanent redirects in `next.config.ts`:**
```ts
redirects: async () => [
  { source: '/sold', destination: '/properties', permanent: true },
  { source: '/sold/:path*', destination: '/properties/:path*', permanent: true },
  { source: '/neighborhoods', destination: '/local-guide', permanent: true },
  { source: '/neighborhoods/:path*', destination: '/local-guide/:path*', permanent: true },
  { source: '/services', destination: '/buying', permanent: true },
]
```

**Update internal links in ALL of these files** (detail pages have hardcoded back-links to `/sold` and `/neighborhoods`):
- `src/components/layout/Nav.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/MobileMenu.tsx`
- `src/components/home/CTABanner.tsx`
- `src/components/home/NeighborhoodTeaser.tsx`
- `src/app/(marketing)/sold/[id]/page.tsx` (back-link to `/sold`)
- `src/app/(marketing)/neighborhoods/[slug]/page.tsx` (back-link to `/neighborhoods`)
- `src/app/(marketing)/page.tsx` (home page)

---

## Phase 3 — Styling Sync

All custom tokens and utilities live in `globals.css`, not `tailwind.config.ts`. Copy the following from Sharon's `src/app/globals.css` into hellolahome's:
- `section-py` utility class
- `container-site` utility class
- `.hover-underline` class (used in Nav links)

**Color token decision (pick one):**
- **Option A (recommended):** Replace hellolahome's color tokens with Sharon's (`--color-charcoal: #1a1919`, `--color-sand: #f2f0e9`, etc.) — full visual sync
- **Option B:** Keep hellolahome's tokens, manually adjust copied component colors

---

## Phase 4 — Config File Additions

**Create `src/config/hero.ts`** — extract hero image paths from `HeroEditorial.tsx` into an array (copy Sharon's structure, substitute Eric's hero image filenames)

**Create `src/config/navLinks.ts`** — extract hardcoded links from `Nav.tsx` into a typed array with updated route names (`/local-guide`, `/properties`, `/buying`, `/selling`)

**Rename `src/lib/motion.ts` → `src/lib/ease.ts`** — Sharon's components (ProcessAccordion etc.) import from `@/lib/ease`. Update all existing imports in hellolahome that reference `motion.ts`.

---

## Phase 5 — Components to Copy from Sharon's Site

Copy from `/sharon-real-estate/site/` into hellolahome, verify imports resolve correctly:

| Sharon's source | hellolahome destination | Notes |
|---|---|---|
| `src/components/services/ProcessAccordion.tsx` | `src/components/services/ProcessAccordion.tsx` | Imports `@/lib/ease` |
| `src/components/home/StatsSection.tsx` | `src/components/home/StatsSection.tsx` | |
| `src/components/ui/PrevNextNav.tsx` | `src/components/ui/PrevNextNav.tsx` | Requires label fields in queries (see Phase 6) |
| `src/components/ui/SectionHeader.tsx` | `src/components/ui/SectionHeader.tsx` | |
| `src/components/ui/ArrowLink.tsx` | `src/components/ui/ArrowLink.tsx` | Update its import to point to existing `@/styles/arrow-link.module.css` — do NOT move the CSS module, existing consumers (`AboutSnippet`, `NeighborhoodTeaser`, `FeaturedListingsClient`) import it from `@/styles/` |
| `src/components/ui/YouTubeEmbed.tsx` | `src/components/ui/YouTubeEmbed.tsx` | |

---

## Phase 6 — Sanity Schema + Query Updates

### Schemas
**`src/sanity/schemas/property.ts`** — add optional fields:
- `price` (number, formatted as currency)
- `city` (string — used in card layout labels; Sharon's schema has this, hellolahome does not)

**`src/sanity/schemas/neighborhoodGuide.ts`** — add optional `order` field (number, for manual sort)

No existing documents break — new fields are optional.

### Queries (`src/lib/sanity/queries.ts`)
The three slug-list queries (`ALL_PROPERTY_SLUGS_QUERY`, `ALL_NEIGHBORHOOD_SLUGS_QUERY`, `ALL_BLOG_SLUGS_QUERY`) **already exist** in hellolahome — but they only project `slug`. `PrevNextNav` also requires label fields. Update each to match Sharon's shape:
```groq
-- Properties: include address
*[_type == "property"]{ "slug": slug.current, address }

-- Neighborhoods: include name  
*[_type == "neighborhoodGuide"]{ "slug": slug.current, name }

-- Blog posts: include title
*[_type == "blogPost"]{ "slug": slug.current, title }
```

Update `NEIGHBORHOODS_QUERY` sort: `order(order asc, name asc)`

Update `ALL_PROPERTIES_QUERY` and `FEATURED_PROPERTIES_QUERY` to project `price` and `city` after schema change.

---

## Phase 7 — Page Reformatting (adopt Sharon's layouts)

Sanity queries and data stay unchanged — only JSX layout and components change to match Sharon's.

### Root homepage `src/app/page.tsx`
- Verify this still correctly delegates to the marketing layout — update if needed

### Home page `(marketing)/page.tsx`
- Pull hero images from `config/hero.ts`
- Add `StatsSection` after about snippet
- Ensure `FeaturedListings` is wired in (server component — already exists, verify position matches Sharon's)
- Section order: Hero → About → Stats → Featured Listings → Neighborhood Teaser → Testimonials → CTA

### Properties page `(marketing)/properties/page.tsx` (was `/sold`)
- Match Sharon's stacked-section layout (active at top, then sold — **not tabs**)
- Match card layout from Sharon's properties page (includes `city` label)

### Properties detail `(marketing)/properties/[id]/page.tsx`
- Match Sharon's richer header, body, and image treatment (not just PrevNextNav)
- Add `PrevNextNav` using updated `ALL_PROPERTY_SLUGS_QUERY`

### Local Guide `(marketing)/local-guide/page.tsx` (was `/neighborhoods`)
- Match Sharon's neighborhood grid layout

### Local Guide detail `(marketing)/local-guide/[slug]/page.tsx`
- Match Sharon's detail layout
- Add `PrevNextNav` using updated `ALL_NEIGHBORHOOD_SLUGS_QUERY`
- `TOWN_PHOTOS` fallback is **inline in this route file** (not a shared util) — update the mapping for Eric's LA neighborhoods

### Buying page `(marketing)/buying/page.tsx` (new)
- Copy Sharon's `/buying/page.tsx` structure
- Use `ProcessAccordion` with Eric's 7-step buying content (extracted from current `services/page.tsx`)

### Selling page `(marketing)/selling/page.tsx` (new)
- Copy Sharon's `/selling/page.tsx` structure
- Use `ProcessAccordion` with Eric's 7-step selling content (extracted from current `services/page.tsx`)

### Blog listing `(marketing)/blog/page.tsx`
- Match Sharon's hero and metadata treatment (different from hellolahome's current version)

### Blog detail `(marketing)/blog/[slug]/page.tsx`
- Match Sharon's full detail layout
- Add `PrevNextNav` using updated `ALL_BLOG_SLUGS_QUERY`

---

## Phase 8 — Email Setup (SendGrid)

```bash
npm uninstall resend
npm install @sendgrid/mail
```

**Replace `src/app/api/contact/route.ts`** with Sharon's SendGrid implementation:
- Uses `process.env.SENDGRID_API_KEY`
- From: `noreply@[eric's-domain].com`
- To: `process.env.AGENT_EMAIL`
- Honeypot field (`website`) for bot detection — **requires UI changes too**

**Update `src/components/contact/ContactForm.tsx`** — add hidden `website` honeypot field (must be sent in the POST body for the API to accept it)

**Update `src/components/home/CTABanner.tsx`** — same honeypot field if it has its own form

**Update `.env.local`:**
```
SENDGRID_API_KEY=your_sendgrid_api_key
AGENT_EMAIL=ezunkleysellsit@gmail.com
```

Remove `RESEND_API_KEY` from `.env.local`.

---

## Phase 9 — Domain Migration (Squarespace → Vercel)

_Separate phase — executes after site is deployed and verified._

1. Vercel dashboard → Project Settings → Domains → add the domain (e.g. `hellolahome.com`)
2. Vercel provides nameserver or A/CNAME records
3. Squarespace → Domains → DNS Settings → update to Vercel's records
4. Wait for DNS propagation (~24–48 hrs); Vercel auto-provisions SSL
5. Update `noreply@` sender in contact route to match the new domain
6. Set all env vars in Vercel dashboard:
   ```bash
   vercel env add SENDGRID_API_KEY
   vercel env add AGENT_EMAIL
   vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
   vercel env add NEXT_PUBLIC_SANITY_DATASET
   vercel env add SANITY_API_READ_TOKEN
   vercel env add SANITY_API_TOKEN
   ```
7. Verify contact form delivers email from production URL

---

## Complete File Checklist

**Copy from Sharon's site:**
- `src/config/hero.ts`
- `src/config/navLinks.ts`
- `src/components/services/ProcessAccordion.tsx`
- `src/components/home/StatsSection.tsx`
- `src/components/ui/PrevNextNav.tsx`
- `src/components/ui/SectionHeader.tsx`
- `src/components/ui/ArrowLink.tsx` (update import to `@/styles/arrow-link.module.css`)
- `src/components/ui/YouTubeEmbed.tsx`
- Relevant page files: properties, properties/[id], local-guide, local-guide/[slug], buying, selling, blog, blog/[slug]

**Modify in hellolahome:**
- `next.config.ts` — redirects
- `src/app/globals.css` — add container-site, section-py, hover-underline, color tokens
- `src/lib/motion.ts` → rename to `ease.ts`, update all existing imports
- `src/config/agent.ts` — verify all fields present
- `src/lib/sanity/queries.ts` — update slug queries with label fields, update neighborhoods sort, add price+city to property queries
- `src/sanity/schemas/property.ts` — add price + city fields
- `src/sanity/schemas/neighborhoodGuide.ts` — add order field
- `src/components/layout/Nav.tsx` — extract to config, update routes
- `src/components/layout/Footer.tsx` — update routes
- `src/components/layout/MobileMenu.tsx` — update routes
- `src/components/contact/ContactForm.tsx` — add honeypot field
- `src/components/home/CTABanner.tsx` — add honeypot field if form present
- `src/app/api/contact/route.ts` — replace with SendGrid version
- `src/app/(marketing)/page.tsx` — home page layout
- `src/app/page.tsx` — verify root redirect still works
- `package.json` — swap resend for @sendgrid/mail

**Rename/delete:**
- `src/app/(marketing)/sold/` → `src/app/(marketing)/properties/`
- `src/app/(marketing)/neighborhoods/` → `src/app/(marketing)/local-guide/`
- `src/app/(marketing)/services/page.tsx` — delete (content moves to buying + selling)

---

## Verification

1. `npm run dev` — all routes load without errors
2. Test every route: `/`, `/about`, `/properties`, `/properties/[id]`, `/local-guide`, `/local-guide/[slug]`, `/buying`, `/selling`, `/blog`, `/blog/[slug]`, `/contact`
3. Confirm redirects: `/sold` → `/properties`, `/neighborhoods` → `/local-guide`, `/services` → `/buying`
4. Confirm `PrevNextNav` renders with correct labels (not undefined) on properties, neighborhood, and blog detail pages
5. Submit contact form → email arrives at `ezunkleysellsit@gmail.com`
6. `npm run build` — no TypeScript errors
7. After domain migration: repeat contact form test from production URL
