'use client';

import { useTheme } from '@/contexts/theme-context';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  const { getBackgroundClass } = useTheme();
  
  return (
    <div className={`min-h-screen ${getBackgroundClass()} ${className}`}>
      {children}
    </div>
  );
}
