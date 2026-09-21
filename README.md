# Pew Pew Pewductions

Rebuilt P3 site. Next.js App Router, deployed on Vercel, campaign data in Supabase.

Design comes from the P3 design system — surfaces, ink and brand hues are its tokens.
The four campaign-chart colours are **not** the raw faction flag colours: those fail
colour-vision testing against the `#212121` ground (ADF navy sits at 1.1:1, RDC black
at 1.3:1, and orange/gold/red are indistinguishable to a deuteranope). The chart
instead encodes **bloc by hue and faction by lightness**, which passes. Faction flags
keep their real colours everywhere else, on white plates.

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

With no environment variables set, the site still runs: it serves the content in
`src/lib/fallback.ts` and the admin page tells you editing is off.

## Environment variables

| Variable | Where it comes from | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API | Public. Baked in at build time, so changing it needs a redeploy. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same page | Public. Read-only by RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | same page | **Server only. Never prefix with `NEXT_PUBLIC_`.** Bypasses RLS; this is what lets the admin page write. |
| `ADMIN_PASSWORD` | you pick it | Shared passphrase for `/admin`. |

## Database

Run `supabase/migrations/0001_init.sql` once in the Supabase SQL editor. It creates
two tables, turns on row level security with public read, and seeds the three 2025
operations and the current faction points.

- `operations` — one row per event. `status` is `upcoming`, `completed` or `cancelled`.
  Flipping an operation to `completed` moves it from the board into campaign history
  automatically.
- `campaign_points` — four rows, one per faction.

Writes only ever happen through the admin page using the service role key, so the
anon key can stay read-only.

## Admin

`/admin`, gated by `ADMIN_PASSWORD`, sets an httpOnly cookie for two weeks. From there
you can add, edit and delete operations and set the four faction point totals. The
public page is `force-dynamic` and revalidates on every save, so changes show up
immediately.

**This auth is deliberately minimal — a shared passphrase, suitable for a demo the
team is testing.** Replace it with real accounts (Supabase Auth) before this serves
the public site.

## Content

Copy, faction briefs, uniform lists, operation briefings and founder bios are carried
over verbatim from pewpewpewductions.com. Logos in `public/logos` are the originals.

Known gaps carried over from the old site: no ticket links on the archived operations,
the rules link points at the rules page rather than the PDF, and the display typeface
in the wordmark is still unidentified — `--display` ships Roboto Slab as a stand-in.
