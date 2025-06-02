'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type AppMode = 'chat' | 'deploy';

interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const AppModeContext = createContext<AppModeContextType>({
  mode: 'chat',
  setMode: () => {},
});

export function AppModeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<AppMode>(() => {
    // Initialize based on pathname
    return pathname.startsWith('/deploy') ? 'deploy' : 'chat';
  });

  useEffect(() => {
    // Update mode based on pathname changes
    if (pathname.startsWith('/deploy')) {
      setMode('deploy');
    } else if (!pathname.startsWith('/deploy')) {
      setMode('chat');
    }
  }, [pathname]);

  return (
    <AppModeContext.Provider value={{ mode, setMode }}>
      {children}
    </AppModeContext.Provider>
  );
}

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error('useAppMode must be used within AppModeProvider');
  }
  return context;
}