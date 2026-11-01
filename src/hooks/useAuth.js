import { useSession } from './auth-client';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const { data: session, loading } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);

  return {
    user,
    isAuthenticated: !!session,
    loading,
    signIn: null, // will be set by AuthProvider
    signOut: null,
  };
};
