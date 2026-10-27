'use client';

import { usePathname } from 'next/navigation';
import RippleEffect from '@/components/ui/RippleEffect';
import CustomCursor from '@/components/ui/CustomCursor';
import TerminalHUD from '@/components/ui/TerminalHUD';
import SmoothScroll from '@/components/ui/SmoothScroll';
import TabVisibility from '@/components/ui/TabVisibility';
import PageTransition from '@/components/ui/PageTransition';
import { BookCallModalProvider } from '@/components/ui/BookCallModal';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* Routes that render standalone — no main-site Navbar/Footer/border */
const STANDALONE_PREFIXES = [
  '/performance-marketing-agency-in-',
  '/performace-marketing-agency-in-',
  '/thank-you',
];

export default function MainSiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalone = STANDALONE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p),
  );

  if (standalone) return <>{children}</>;

  return (
    <div className="border-l-4 border-bt-red">
      <BookCallModalProvider>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </BookCallModalProvider>
      <RippleEffect />
      <CustomCursor />
      <TerminalHUD />
      <SmoothScroll />
      <TabVisibility />
    </div>
  );
}
