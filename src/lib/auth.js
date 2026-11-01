import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { MongoClient } from 'mongodb';

// Reuse one MongoClient across hot reloads and serverless invocations
const globalForMongo = globalThis;
const client =
  globalForMongo._kindoraMongoClient ||
  new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');
if (process.env.NODE_ENV !== 'production') globalForMongo._kindoraMongoClient = client;

const db = client.db(process.env.DB_NAME || 'kindora');

const appUrl = process.env.BETTER_AUTH_URL || 'http://localhost:3000';

const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: appUrl,
  trustedOrigins: [appUrl, ...(process.env.TRUSTED_ORIGINS || '').split(',').filter(Boolean)],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
  },
  socialProviders,
  plugins: [
    // Issues JWTs (GET /api/auth/token) and publishes the public keys at /api/auth/jwks.
    // The Express API verifies tokens against that JWKS.
    jwt({
      jwt: {
        issuer: process.env.JWT_ISSUER || appUrl,
        audience: process.env.JWT_AUDIENCE || 'kindora-api',
        expirationTime: '1h',
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }),
      },
    }),
    nextCookies(),
  ],
});

export default auth;
