import { ReactNode } from 'react';
import { BottomNav } from '@/components/ui/BottomNav';

interface MobileLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function MobileLayout({ children, hideNav = false }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className={hideNav ? "" : "pb-20"}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
