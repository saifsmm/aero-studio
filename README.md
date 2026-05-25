# Aero Studio

Premium scroll-based website for Aero Studio, a Dubai cycling apparel brand.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Vercel-ready static deployment

## Local Run

```bash
npm install
npm run dev
```

## Production Check

```bash
npm run lint
npm run build
```

## Assets

Brand and campaign imagery lives in `public/assets`. The high-resolution logo PDF is also preserved there for future design/export use.

## Vercel

Import the GitHub repository into Vercel as a Vite project.

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

After deployment, connect `aerostudio.ae` from the Vercel project domain settings when the domain DNS is ready.
