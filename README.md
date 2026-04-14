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

Required (FormSubmit contact form endpoint):

- `NEXT_PUBLIC_FORMSUBMIT_ENDPOINT` (example: `https://formsubmit.co/ajax/your-email@example.com`)

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

For FormSubmit, submit one test form once after setup so FormSubmit can activate/verify forwarding to your email.
