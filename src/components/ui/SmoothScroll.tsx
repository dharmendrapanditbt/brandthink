"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenisInstance, setLenisInstance, SCROLL_OFFSET } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

// A slight overshoot-and-settle curve (easeOutBack) gives the scroll a
// springy, bouncy feel instead of a flat linear/ease-out glide.
function easeOutBack(t: number) {
  const c1 = 1.2;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export default function SmoothScroll() {
  const pathname = usePathname();

  // Handles anchor links that navigate across pages (e.g. clicking "About"
  // from /technology to /#about) — Next.js's client-side router change
  // doesn't reliably land on the hashed section once Lenis has taken over
  // scrolling, so once the destination page has mounted, scroll to it here.
  //
  // Sections below the target (pinned filmstrips, parallax video, etc.) can
  // still be finalizing their GSAP ScrollTrigger pin-spacer heights and
  // Lenis's measured scroll limit a moment after mount, which previously
  // made a single early scrollTo() land far short of the real target. We
  // force a ScrollTrigger refresh right before scrolling, and scroll twice
  // — once early, once again once things have definitely settled — so the
  // final position is always correct even if the first attempt undershoots.
  // Disable browser automatic scroll position restoration on back/forward
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Handles anchor links as well as scrolling to the top on new page navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);

      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.refresh();

        const lenis = getLenisInstance();
        if (lenis) {
          lenis.scrollTo(el, { offset: SCROLL_OFFSET, immediate: false });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      const early = setTimeout(scrollToTarget, 250);
      const settled = setTimeout(scrollToTarget, 900);

      return () => {
        clearTimeout(early);
        clearTimeout(settled);
      };
    } else {
      // Force scroll position to the top when navigating or pressing back/forward
      const resetScroll = () => {
        const lenis = getLenisInstance();
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
      };

      resetScroll();
      const earlyReset = setTimeout(resetScroll, 50);
      const settledReset = setTimeout(resetScroll, 300);

      return () => {
        clearTimeout(earlyReset);
        clearTimeout(settledReset);
      };
    }
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.3,
      easing: easeOutBack,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    setLenisInstance(lenis);

    // Keep GSAP's ScrollTrigger in sync with Lenis's virtual scroll position
    // — without this, ScrollTrigger's own scroll tracking can go stale and
    // miss enter/leave triggers (e.g. scroll-out animations never firing).
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
