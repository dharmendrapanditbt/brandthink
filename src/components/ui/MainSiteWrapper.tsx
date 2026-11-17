'use client';

import { usePathname } from 'next/navigation';
import RippleEffect from '@/components/ui/RippleEffect';
import CustomCursor from '@/components/ui/CustomCursor';
import TerminalHUD from '@/components/ui/TerminalHUD';
import SmoothScroll from '@/components/ui/SmoothScroll';
import TabVisibility from '@/components/ui/TabVisibility';
import PageTransition from '@/components/ui/PageTransition';
import SplashCursor from '@/components/ui/LazySplashCursor';
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
        {/* One site-wide cursor effect, tuned to match the About page */}
        <SplashCursor
          RAINBOW_MODE={false}
          COLOR="#460000"
          CURL={1}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={8000}
          DENSITY_DISSIPATION={1}
          VELOCITY_DISSIPATION={10}
          SHADING={true}
          Z_INDEX={1}
        />
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
