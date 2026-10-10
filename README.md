# K Kumar Reddy — Portfolio (MERN)

A full-stack portfolio site: React (Vite + Tailwind + Framer Motion) frontend
and an Express/MongoDB backend for the contact form.

## Structure

```
portfolio/
├── client/     React frontend (Vite, Tailwind, Framer Motion)
├── server/     Express backend (contact form API, optional MongoDB)
└── package.json  root scripts that run both together
```

## Quick start

From the `portfolio/` root folder:

```bash
npm run install:all   # installs root, client and server dependencies
npm run dev            # runs the client (http://localhost:5173) and server
                        # (http://localhost:5000) together
```

Then open **http://localhost:5173**.

If you'd rather install manually:

```bash
cd client && npm install
cd ../server && npm install
cd ..
npm run dev
```

## Contact form / MongoDB (optional)

The contact form works out of the box — messages are just logged to the
server console. To persist them to MongoDB:

1. `cp server/.env.example server/.env`
2. Add your connection string to `MONGO_URI` in `server/.env`
3. Restart `npm run dev`

## Editing your content

All copy (name, projects, experience, education, etc.) lives in the small
components under `client/src/components/`. Update the arrays at the top of
each file — `Projects.jsx`, `Experience.jsx`, `Education.jsx`,
`Learning.jsx` — to reflect your own details, and swap the email/phone/social
links in `Contact.jsx`.

## Build for production

```bash
npm run build
```

Outputs a static build to `client/dist`, deployable to any static host
(Vercel, Netlify, etc). Deploy `server/` separately (Render, Railway, etc.)
and point the client's `/api` requests at it in production.
