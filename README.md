# Sarah Gooding — portfolio site

A plain HTML/CSS/JS site (no build step, no framework) replacing the Wix site at
sarahgooding4.wixsite.com/sarahgooding.

## Structure

- `index.html` — home page (bio, portrait, contact)
- `brand-work.html` — brand copywriting/scriptwriting project gallery
- `editorial-work.html` — list of published articles
- `assets/css/style.css` — all styling
- `assets/js/nav.js` — mobile nav toggle
- `assets/img/` — images pulled from the Wix site

## Editing content

Everything is plain HTML — open a page in a text editor and change the text or
images directly. No build tools, no npm install required.

## Previewing locally

Open `index.html` directly in a browser, or run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Hosting (cheap/free options)

Any static host works since there's no server-side code. Recommended, roughly in
order of simplicity:

1. **Netlify** — drag-and-drop this folder at app.netlify.com/drop, or connect a
   GitHub repo for auto-deploys on push. Free tier, custom domain support.
2. **Cloudflare Pages** — connect a GitHub repo, free tier, custom domain support.
3. **GitHub Pages** — free if the repo is public (or use a private repo with GitHub
   Pro). Push to GitHub, enable Pages in repo settings, pointing at the `main`
   branch root.

All three let you attach a custom domain (e.g. sarahgooding.com) for the cost of
the domain registration only (~$10-15/year), no hosting fee.

## Known follow-ups

- The "Brand work" page has three project images pulled from the old site but no
  case-study copy (client name, brief, role) — the original site didn't have this
  either. Replace the placeholder captions with real project details.
- The contact form doesn't send email yet. It needs a form backend — the simplest
  free option is [Formspree](https://formspree.io): sign up, create a form, and
  set `action="https://formspree.io/f/yourFormId"` on the `<form>` in
  `index.html`. Until then, the email link works.
- No custom domain is configured yet — that happens at the host (Netlify/Cloudflare
  Pages/GitHub Pages) once you pick one.
