# Kindora Client

Next.js frontend for the Kindora Social Impact Platform.

## Live Website

[Kindora on Vercel](https://kindora.vercel.app)

## Features

- Discover upcoming community service events.
- Create and manage volunteering events.
- Join community initiatives.
- Secure authentication with Google and email/password.
- JWT-protected REST APIs.
- Personalized volunteer dashboard.
- Dark and light theme support.
- Responsive design for all devices.
- Loading skeletons and empty states.

## Technologies Used

- [Next.js 14](https://nextjs.org/) - App Router
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Better Auth](https://www.better-auth.com/) - Authentication
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Sonner](https://sonner.emilkowalski.ski/) - Notifications
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001

BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

MONGODB_URI=your-mongodb-connection-string
```

## Authentication

- **Better Auth** handles registration, login, and Google social login.
- JWT tokens are obtained via `authClient.token()` and stored in localStorage.
- The Express backend verifies JWTs using Better Auth's JWKS endpoint.
- Protected routes redirect unauthenticated users to login with callback URL preservation.

## Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   ├── (protected)/       # Private pages (auth required)
│   │   ├── api/auth/          # Better Auth route handler
│   │   ├── layout.jsx
│   │   └── globals.css
│   ├── components/
│   │   ├── shared/            # Navbar, Footer, ThemeToggle, Skeletons
│   │   ├── home/              # Homepage sections
│   │   ├── events/            # Event components
│   │   └── ui/                # UI primitives (ConfirmDialog, etc.)
│   ├── lib/                   # Auth, API, utils
│   ├── hooks/                 # Custom React hooks
│   └── providers/             # ThemeProvider, AuthProvider
├── public/
├── middleware.ts              # Route protection
├── .env.local
├── next.config.js
├── tailwind.config.js
└── package.json
```

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Make sure to configure all environment variables in the Vercel dashboard, including:
- `NEXT_PUBLIC_API_URL` - Your Render backend URL
- `BETTER_AUTH_SECRET` - Same as server
- `BETTER_AUTH_URL` - Your Vercel URL
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- `MONGODB_URI` - MongoDB Atlas connection string

## Backend Repository

The Express.js backend is in a separate repository: `kindora-server`
