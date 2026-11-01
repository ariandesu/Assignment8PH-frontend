'use client';

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kindora_token');
    }
    return null;
  });

  useEffect(() => {
    const initAuth = async () => {
      const session = await authClient.getSession();
      if (session?.token) {
        setToken(session.token);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
