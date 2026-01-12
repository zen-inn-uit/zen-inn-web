'use client';

import PartnerSidebar from '@/components/partner/partner-sidebar';
import PageTransition from '@/components/page-transition';
import { ThemeProvider, useTheme } from '@/contexts/theme-context';
import { AuthSync } from '@/components/auth/auth-sync';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { getBackgroundClass } = useTheme();
  
  return (
    <div className={`flex min-h-screen ${getBackgroundClass()}`}>
      <AuthSync />
      <div className="flex-shrink-0">
        <PartnerSidebar />
      </div>
      <main className="flex-1 min-w-0 relative overflow-x-auto">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  );
}

export default function HostLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
