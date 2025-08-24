# Garvin Chimone — Frontend Portfolio

Showcase portfolio built with React, Vite, JavaScript, CSS, and Tailwind CSS. It demonstrates responsive layouts, component-driven UI, and small interactive features highlighting front-end skills.

## Quick overview

- Purpose: Present projects, skills, and contact information in a fast, responsive single-page app.
- Stack: React + Vite, Tailwind CSS, plain CSS for small custom styles.
- Live demo: https://garvin-chimone.pages.dev/
- Source: https://github.com/Chimoneg27/Garvin-Chimone

## Features

- Responsive, mobile-first design
- Clean, component-based structure (Navbar, Slider, Forms, Footer)
- Easy to customize and extend
- Fast local development with Vite (HMR)

## Project structure (high level)

- `src/` — React source files
   - `components/` — reusable UI components (Navbar, Footer, forms, etc.)
   - `pages/` — page views (Home, Dev, Music, Movies, Books)
   - `assets/` — images, PDFs, fonts
   - `styles/` — global and module CSS
- `public/` — static assets served as-is
- `package.json` — scripts and dependencies

## Local setup

Prerequisites: Node.js (LTS) and npm.

1. Clone the repo

```bash
git clone https://github.com/Chimoneg27/Garvin-Chimone.git
cd Garvin-Chimone
```

2. Install dependencies

```bash
npm install
```

3. Run the dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Preview the production build locally

```bash
npm run preview
```

## Component contract (concise)

- Inputs: static assets and JSON data in `src/lib` (e.g., lists of items)
- Outputs: rendered UI and client-side interactions (no server required)
- Error modes: missing assets fall back to placeholders; build errors reported by Vite

Edge cases considered:
- No-JS: static content still accessible from `public/` assets
- Missing images: components use fallback UI
- Large screens / small screens: responsive breakpoints via Tailwind

## Tests & quality

- This repo currently doesn't include automated tests. Recommended next steps: add a small Jest/Testing Library suite for core components.

## Deployment

- The site is deployable as a static site (Pages, Netlify, Vercel). The current live site uses GitHub Pages / Pages.dev.

## Contributing

- Fixes, enhancements, and design tweaks welcome. Suggested workflow:
   1. Fork the repository
   2. Create a feature branch
   3. Open a PR with a clear description and screenshots when applicable

## License

Distributed under the MIT License. See `LICENSE`.

## Contact

Garvin Chimone — chimonegarvin27@gmail.com

Project: https://github.com/Chimoneg27/Garvin-Chimone
Live site: https://garvin-chimone.pages.dev/
