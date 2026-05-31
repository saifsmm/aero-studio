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

Brand and campaign imagery used by the website lives in `public/assets`. Internal source and export files live in `brand-source/assets` so Vercel does not publish them.

## Preorder environment variables

Configure the server-only preorder credentials in Vercel using the names in `.env.example`. The form uses Vercel BotID for invisible bot checks and Upstash Redis for the shared rate limit.

## Vercel

Import the GitHub repository into Vercel as a Vite project.

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

After deployment, connect `aerostudio.ae` from the Vercel project domain settings when the domain DNS is ready.
