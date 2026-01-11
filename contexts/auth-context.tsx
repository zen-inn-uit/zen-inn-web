'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authAPI } from '@/lib/api/auth-api';
import AuthLoading from '@/components/auth-loading';

interface User {
  id: string;
  email: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/login');
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      // Call profile API to verify token
      const profile = await authAPI.getProfile();
      setUser({
        id: profile.userId,
        email: profile.email,
        role: profile.role,
        status: profile.status,
      });
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // Token is invalid or expired
      logout();
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setLoading(false);
        // Redirect to login if on protected route
        if (!isPublicRoute) {
          router.push('/login');
        }
        return;
      }

      try {
        // Verify token by calling profile API
        await refreshUser();
      } catch (error) {
        console.error('Auth check failed:', error);
        // Token invalid, redirect to login if on protected route
        if (!isPublicRoute) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]); // Re-check when route changes

  // Show loading only on protected routes
  if (loading && !isPublicRoute) {
    return <AuthLoading />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
