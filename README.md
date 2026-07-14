# ZYRCA – Official Website

Premium official website for **ZYRCA – Smart Fasting Tracker**.

Built with Next.js, TypeScript, Tailwind CSS, next-intl, and Framer Motion. Statically exported for GitHub Pages and custom domain deployment.

## Features

- 7 languages (EN, DE, FR, ES, IT, PT, AR) with RTL support
- Dark / Light / System theme
- Full SEO (metadata, sitemap, robots, JSON-LD)
- Privacy Policy, Terms, Support, Delete Account pages
- Premium animations and responsive design
- GitHub Pages ready

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Upload Your Assets

Place files in the `uploads/` folder:

```
uploads/
  logo.png
  app-icon-512.png
  screenshots/dark/*.png
  screenshots/light/*.png
```

Then run:

```bash
npm run integrate-assets
```

This copies assets and regenerates favicons, PWA icons, and touch icons.

## Build

```bash
npm run build
```

Output is in the `out/` directory.

## GitHub Pages Deployment

1. Set repository name as `NEXT_PUBLIC_BASE_PATH` if using `username.github.io/repo-name`:

```bash
# .env.production
NEXT_PUBLIC_BASE_PATH=/zyrca-privacy
NEXT_PUBLIC_SITE_URL=https://yourusername.github.io/zyrca-privacy
```

For custom domain (`zyrca.app`), leave `NEXT_PUBLIC_BASE_PATH` empty.

2. Build and deploy the `out/` folder to GitHub Pages.

Or use the included GitHub Actions workflow (`.github/workflows/deploy.yml`).

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | `https://zyrca.app` |
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages base path | `""` |
| Google Play URL | Edit in `src/lib/constants.ts` | `YOUR_GOOGLE_PLAY_URL` |

## Pages

| Route | Description |
|-------|-------------|
| `/[locale]/` | Home |
| `/[locale]/features` | Features |
| `/[locale]/privacy` | Privacy Policy |
| `/[locale]/terms` | Terms of Service |
| `/[locale]/support` | Support & FAQ |
| `/[locale]/delete-account` | Account deletion |

## Tech Stack

- Next.js 16 (App Router, Static Export)
- React 19 + TypeScript
- Tailwind CSS 4
- next-intl
- Framer Motion
- Lucide Icons
- next-themes
