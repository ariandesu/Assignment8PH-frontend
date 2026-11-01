# Kindora – Social Development Events Platform

Kindora is a community-driven platform where people create, join and track social service events in their local area, from winter clothes distribution in Mirpur to tree plantation and beach cleanups.

**Live site:** https://assignment8ph-2elxi219o-mahirs-projects-9649281e.vercel.app

**API server repository:** https://github.com/ariandesu/Assignment8-backend

## Features

- **Create community events.** Logged-in users can publish an event with a title, description, event type, thumbnail, location and a future date. Validation runs on both the client and the server.
- **Upcoming events only.** The Upcoming Events page lists events that are still to come, with search by title, location and event-type filters, and pagination.
- **One-click joining.** Anyone can view event details; logged-in users can join an event, and each user can join an event only once.
- **Personal dashboards.** *Joined Events* lists everything you signed up for, sorted by event date. *Manage Events* lets you update or delete only the events you created.
- **Secure authentication.** Email/password and Google login with Better Auth (MongoDB adapter). The Express API is protected with JWTs that are verified against Better Auth's JWKS.
- **Profile management.** Update your display name and profile picture; changes show up in the navbar right away.
- **Light and dark themes.** A theme toggle switches the whole site, and loading skeletons appear while data loads. The layout is responsive on mobile, tablet and desktop.

## Tech Stack

Next.js 14 (App Router) · Tailwind CSS · Better Auth + MongoDB adapter + JWT plugin · React Hook Form + Zod · Sonner · next-themes · lucide-react

## Pages

| Route | Access |
|---|---|
| `/` | Public: banner, features, 6 nearest upcoming events, gallery, newsletter |
| `/events` | Public: all upcoming events |
| `/events/[id]` | Public details; joining requires login |
| `/login`, `/register` | Public |
| `/create-event` | Private |
| `/manage-events`, `/update-event/[id]` | Private (owner only) |
| `/joined-events` | Private |
| `/profile` | Private |

## Environment Variables

Create `.env.local` for local development; set the same keys in Vercel for production.

```env
# Express API base URL
NEXT_PUBLIC_API_URL=http://localhost:5001

# Better Auth
BETTER_AUTH_URL=http://localhost:3000       # this app's own URL (the production URL on Vercel)
BETTER_AUTH_SECRET=long-random-string
MONGODB_URI=mongodb+srv://...
DB_NAME=kindora

# JWT claims (must match the API's JWT_ISSUER / JWT_AUDIENCE)
JWT_ISSUER=http://localhost:3000
JWT_AUDIENCE=kindora-api

# Google login (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

For Google login, add `<BETTER_AUTH_URL>/api/auth/callback/google` as an authorised redirect URI in Google Cloud Console.

## Run Locally

```bash
npm install
npm run dev
```
