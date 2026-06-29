# Northcast — marketing site

A single-page static marketing site. No build step, no dependencies. Just static HTML, CSS, and JS.

## Files
- `index.html` — the page (all sections)
- `styles.css` — Ember theme + responsive
- `main.js` — nav, mobile menu, FAQ accordion, scroll reveal, compass animation
- `assets/favicon.svg`, `assets/og.svg` — favicon and Open Graph image
- `vercel.json` — clean URLs + caching headers

## Deploy to Vercel

**Option A — Drag & drop (no Git, fastest)**
1. Install the CLI once: `npm i -g vercel`
2. From this folder: `vercel` (follow prompts), then `vercel --prod` to go live.

**Option B — Git import**
1. Push this folder to a GitHub repo.
2. In Vercel: New Project → Import the repo.
3. Framework preset: **Other**. Build command: **none**. Output directory: **`.`** (root).
4. Deploy.

There is no framework or build — Vercel serves the files directly.

## Booking
The Calendly inline widget is embedded directly in the final "Book a call" section
(`#book`), so visitors book without leaving the page. To change the event, edit the
`data-url` on the `.calendly-inline-widget` in `index.html` (currently
`https://calendly.com/northcast/intro-call`). The nav, hero, and timeline "Book a call"
buttons all scroll to that embedded widget.

## After deploy
- Verify the Open Graph preview, then connect a custom domain in Vercel → Settings → Domains.
