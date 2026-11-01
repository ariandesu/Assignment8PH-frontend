import { createAuthClient } from 'better-auth/react';
import { jwtClient } from 'better-auth/client/plugins';

// No baseURL: the auth routes live on this same Next.js app (/api/auth/*),
// so requests always go to the current origin in every environment.
export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession, getSession, updateUser } = authClient;
