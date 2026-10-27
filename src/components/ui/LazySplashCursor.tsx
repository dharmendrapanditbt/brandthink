"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentProps } from "react";

const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), { ssr: false });

// The WebGL fluid sim is purely a cursor effect, so its code isn't downloaded
// or started until the visitor first moves the mouse — keeping it off the
// initial page load entirely.
export default function LazySplashCursor(props: ComponentProps<typeof SplashCursor>) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const activate = () => setActive(true);
    window.addEventListener("mousemove", activate, { once: true });
    return () => window.removeEventListener("mousemove", activate);
  }, []);

  return active ? <SplashCursor {...props} /> : null;
}
