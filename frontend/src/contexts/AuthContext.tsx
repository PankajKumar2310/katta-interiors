import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, login as apiLogin, register as apiRegister, getProfile } from '@/services/authApi';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const { token: storedToken, user: storedUser } = JSON.parse(stored);
        setToken(storedToken);
        setUser(storedUser);
      } catch {
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('auth', JSON.stringify({ token: res.token, user: res.user }));
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await apiRegister(name, email, password);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('auth', JSON.stringify({ token: res.token, user: res.user }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
