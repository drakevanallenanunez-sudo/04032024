'use client';

import React, { useState, useEffect } from 'react';
import WebLock from './WebLock';

const SESSION_KEY = 'klyanne_unlocked';

export default function AppGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    setUnlocked(stored === 'true');
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setUnlocked(true);
  };

  // Still loading from sessionStorage
  if (unlocked === null) return null;

  if (!unlocked) {
    return <WebLock onUnlock={handleUnlock} />;
  }

  return <>{children}</>;
}
