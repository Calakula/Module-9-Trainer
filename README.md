# Module 9 Trainer

Study site for Module 9: Virtualization and Cloud Computing (EN / RU / KK).
Flashcards, shuffled test, matching, blitz, mistakes review, theory.

## Structure
- `index.html` - page shell
- `css/style.css` - styles
- `js/data.js` - translations (UI, theory), questions, term pairs
- `js/app.js` - logic of all pages

No build step: static files only. Open `index.html` locally to try it.

## Deploy on GitHub Pages
1. Create a repo and push all files to `main`.
2. Repo Settings -> Pages -> Source: **GitHub Actions**.
3. Each push to `main` deploys automatically (`.github/workflows/pages.yml`).
Site URL: `https://<username>.github.io/<repo>/`

Alternative: Netlify / Vercel / Cloudflare Pages - import the repo, no build command, output directory `.`.

## Edit
- Add or fix questions in `js/data.js` (`Q` array: `[question, [correct...], [wrong...]]`).
- Add a language: add a key to `UI` and `TH`, then a button in `index.html`.
