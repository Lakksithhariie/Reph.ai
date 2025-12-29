import { useState, useEffect } from 'react';
import { UsageState } from '../types';
import { USAGE_LIMITS } from '../config/constants';

export const useUsageLimit = (isPro: boolean, isAuthenticated: boolean): UsageState & {
  decrementUsage: () => void;
  resetUsage: () => void;
} => {
  const [remaining, setRemaining] = useState(0);

  // 🔓 DEV MODE BYPASS
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

  useEffect(() => {
    // 🔓 Unlimited in dev mode
    if (isDevMode || isPro) {
      setRemaining(USAGE_LIMITS.PRO_USER);
      return;
    }

    const stored = localStorage.getItem('reph_free_uses_remaining');
    const limit = isAuthenticated ? USAGE_LIMITS.FREE_USER : USAGE_LIMITS.GUEST;
    
    if (!stored) {
      localStorage.setItem('reph_free_uses_remaining', limit.toString());
      setRemaining(limit);
    } else {
      setRemaining(parseInt(stored));
    }
  }, [isPro, isAuthenticated, isDevMode]);

  const decrementUsage = () => {
    if (isDevMode || isPro) return; // 🔓 Don't decrement in dev mode
    
    const newRemaining = Math.max(0, remaining - 1);
    setRemaining(newRemaining);
    localStorage.setItem('reph_free_uses_remaining', newRemaining.toString());
  };

  const resetUsage = () => {
    const limit = isAuthenticated ? USAGE_LIMITS.FREE_USER : USAGE_LIMITS.GUEST;
    setRemaining(limit);
    localStorage.setItem('reph_free_uses_remaining', limit.toString());
  };

  return {
    remaining: isDevMode ? 999 : remaining, // 🔓 Show 999 in dev mode
    isExhausted: isDevMode ? false : (remaining === 0 && !isPro), // 🔓 Never exhausted in dev
    decrementUsage,
    resetUsage
  };
};
