import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';

// Mock auth for V1 (replace with Supabase/Clerk later)
export const useAuth = (): AuthState & {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
} => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('reph_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => { // ← Prefix with _
    // Mock login (replace with real auth)
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      isPro: false,
      createdAt: new Date()
    };
    
    localStorage.setItem('reph_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (email: string, _password: string) => { // ← Prefix with _
    // Mock signup
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      isPro: false,
      createdAt: new Date()
    };
    
    localStorage.setItem('reph_user', JSON.stringify(mockUser));
    setUser(mockUser);
    
    // Reset usage on signup
    localStorage.setItem('reph_free_uses_remaining', '5');
  };

  const logout = () => {
    localStorage.removeItem('reph_user');
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  };
};
