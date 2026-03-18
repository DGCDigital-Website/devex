# DGC Website — Project Guidelines

## Project Overview
**Client:** Devex Global Consult (DGC)
**Stack:** Next.js 16 App Router · TypeScript 5 (strict, es5 target) · Tailwind CSS 3 · Framer Motion · GSAP · Lottie · Radix UI · Brevo email API
**Live domain (target):** `https://www.devexglobal.com`
**Dev:** `npm run dev` (requires `npm install` first and `.env.local` with `BREVO_API_KEY`)

---

## Brand Identity

| Token | Value |
|---|---|
| `dgc-blue-1` | `#3D9DD9` — primary brand blue, highlights, CTA |
| `dgc-blue-2` | `#177DA6` — secondary / hover state |
| `dgc-dark-blue-1` | `#0B2D59` — hero/footer background |
| `dgc-dark-blue-2` | `#0C2C65` — gradient pair |
| `dgc-light` | `#50D4F2` — active dot, light accent |
| `dgc-black` | `#0D0D0D` — dark gradient end |
| `--highlight` CSS var | `#3D9DD9` |

**Typography:** Neometric custom font family (woff/woff2/ttf, weights 300–800) — loaded via `src/app/fonts.css` and applied through `font-neometric` Tailwind class.
**Tagline:** "Powerful Insights | Proven Delivery"
**Company name:** Devex Global Consult
**Short name:** DGC

**Contact:**
- Phone: +254 752 889 900
- Email: info@devexglobal.com
- Address: The Mint Hub, Westlands, Nairobi, Kenya

**Social:** LinkedIn / Twitter / Facebook all at `devexglobal`

---

## Architecture

### Site structure
This is a **multi-page Next.js app** — not a single-page scroll site like the niftyIT template it was based on. The homepage (`/`) hosts the hero + content sections as a landing page. Separate routes handle deeper content.

```
src/app/
├── page.tsx                  # Homepage (Hero + About + Services + Testimonials + Contact)
├── hero.tsx                  # Hero section (Globe + DotGrid + TrueFocus + metrics)
├── layout.tsx                # Root layout (metadata, GA, LogoHeader wrapper)
├── about/page.tsx            # Full About page (stub — to be expanded)
├── blog/page.tsx             # Blog index (stub — CMS/data source TBD)
├── contact/page.tsx          # Dedicated Contact page (stub)
├── jobs/page.tsx             # Jobs/Careers page (stub)
├── portfolio/page.tsx        # Portfolio page — reads from lib/portfolio-data.ts
├── services/
│   ├── page.tsx              # Services index (links to sub-pages)
│   ├── organizational-strengthening/page.tsx
│   ├── capacity-strengthening/page.tsx
│   ├── system-strengthening/page.tsx
│   └── safety-security/page.tsx
└── api/email/
    ├── contact/route.ts
    ├── co-create/route.ts
    └── newsletter/route.ts
```

### Components
```
src/components/
├── index.ts                  # Barrel exports
├── layout.tsx                # Wraps children with LogoHeader
├── logo-header.tsx           # DGC logo + HeroPill announcement
├── about-us.tsx              # Homepage About section (stats grid + feature cards)
├── services.tsx              # Homepage Services section (4-tab component)
├── testimonials.tsx          # Homepage Testimonials + CTA block
├── SignupFormDemo.tsx        # Contact + Engage DGC dual-form
├── footer.tsx                # Footer (newsletter, social, nav, modals)
├── back-to-top.tsx           # Floating scroll-to-top button
├── TrueFocus.tsx / .css      # Animated word-cycling headline
└── ui/
    ├── container.tsx         # max-w-7xl centred layout wrapper
    ├── globe.tsx             # COBE interactive 3-D globe (WebGL canvas)
    ├── DotGrid.tsx           # GSAP InertiaPlugin interactive dot canvas
    ├── animated-testimonials.tsx
    ├── hero-pill.tsx
    ├── pill-tabs.tsx
    ├── input.tsx / label.tsx # Radix-style form primitives
    ├── modal.tsx
    ├── newsletter-subscription-form.tsx
    ├── email-preview.tsx     # 3-tab email template preview modal
    ├── privacy-policy.tsx
    └── terms-of-service.tsx
```

### Lib
```
src/lib/
├── utils.ts           # cn() Tailwind class merger
├── rate-limit.ts      # In-memory rate limiter (5 req/IP/15 min, store.forEach pattern)
├── email-service.ts   # Brevo REST API v3 — lazy getApiKey(), 3 templates + admin notify
└── portfolio-data.ts  # PortfolioProject type + PORTFOLIO_PROJECTS array (6 projects)
```

---

## Hero Section — Design Concept

The hero is a **self-contained rounded card** (`rounded-[2.5rem]`) inside a `Container`, sitting flush with the page top with minimal padding. It is intentionally **different from the niftyIT hero** — it does not use PillTabs or a navbar strip.

**Layers (bottom to top):**
1. Dark blue gradient background (`dgc-dark-blue-1 → dgc-dark-blue-2 → dgc-black`)
2. `DotGrid` interactive GSAP canvas — `opacity-30`, repels on mouse hover
3. Second gradient overlay for text readability
4. Soft vertical vignette (`from-black/70 via-black/25 to-transparent`)
5. **Content zone** — `TrueFocus` headline + subtitle paragraph (top-centre)
6. **Globe** (`cobe` WebGL) — cropped to show only the top hemisphere, rising from the bottom of the card. Africa centred/visible. User can drag to spin it.
7. **Metrics strip** — 4 stats (e.g. "60+ programmes delivered across Africa") with a vertical `dgc-blue-1` accent bar, positioned above the globe's equator line
8. `radial-gradient` glow overlay on the globe for a warm blue bloom effect

**The key visual metaphor:** DGC operates across Africa and beyond — the globe literally represents their geographic reach. The metrics are anchored over the globe to reinforce scale. The DotGrid creates subtle interactivity without distracting from the primary globe focal point.

**Note:** The `page.tsx` homepage no longer uses the `super-wide-sec` wrapper div or `Footer`/`BackToTop` imports — those were removed/simplified. Footer and BackToTop should be re-added to `page.tsx` if/when needed.

---

## Key Decisions & Conventions

- **`pill-tabs.tsx`** exists in ui/ but is not currently used in the hero — the hero uses the globe instead. Keep it available for potential inner-page navigation.
- **`logo-header.tsx`** wraps every page via `Layout` in `app/layout.tsx` — it renders the DGC logo + HeroPill announcement.
- **No nifty-\* Tailwind tokens** — always use `dgc-*` equivalents.
- **Color hex shortcuts** — never use niftyIT colours (`#10c7e6`, `nifty-cyan-1`, etc.). DGC primary is `#3D9DD9` / `dgc-blue-1`.
- **`email-service.ts`** uses lazy `getApiKey()` — the constructor does NOT throw. API key is validated only at call time.
- **`.npmrc`** has `legacy-peer-deps=true` for React 19 compatibility.
- **ES5 downlevel iteration** — use `store.forEach()` in `rate-limit.ts`, never `for...of Map.entries()`.
- **`cobe` package** must be in `package.json` dependencies for the Globe component to build.
- **Multi-page route stubs** (`/about`, `/blog`, `/contact`, `/jobs`, `/portfolio`, `/services/*`) exist as placeholders — expand with real content as needed.
- **Portfolio data** lives in `src/lib/portfolio-data.ts` as a typed static array. 6 real DGC projects are seeded. Add more there.

---

## Environment Variables

```bash
# .env.local (never commit)
BREVO_API_KEY=your_brevo_api_key_here
```

---

## Stats (from dgc/src/lib/data.ts)
- 480+ evaluations · 130+ consultancies · 30+ years · 22 African countries · 98% satisfaction

## Services
1. **Organisational Strengthening** — `#3D9DD9`
2. **Capacity Strengthening** — `#177DA6`
3. **System Strengthening** — `#50D4F2`
4. **Safety & Security** — `#7ED1F2`

## Testimonials
Plan International · IRC · WFP · LVCT Health
