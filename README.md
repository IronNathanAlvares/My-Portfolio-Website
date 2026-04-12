# Portfolio Website (Next.js)

Iron Man themed portfolio built with Next.js, React, Three.js, and GSAP.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Fill in environment values in `.env.local`.

4. Run the dev server:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Environment Variables

Server-side (required for contact form email sending):

- `SENDGRID_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Public (optional, shown in footer if set):

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`

## Production Build Check

Before deploying:

```bash
npm run build
```

## Deploy To Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. In Vercel Project Settings -> Environment Variables, add all required values from `.env.example`.
4. Trigger deployment.

If the contact environment variables are missing, `/api/contact` will return `503` with a configuration error.
