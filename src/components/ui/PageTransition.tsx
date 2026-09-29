"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLenisInstance } from "@/lib/lenis";

const SPARK_SIZE = 120;
const CLOSE_MS = 450;
const MAX_WAIT_MS = 4000;
const OPEN_MS = 450;

// Reveal choreography: the single center spark appears first and holds
// alone for CENTER_HOLD_MS, then the rest of the grid starts appearing,
// staggered across BURST_SPREAD_MS so they multiply outward rather than
// all popping in on the same frame.
const CENTER_HOLD_MS = 500;
const BURST_SPREAD_MS = 300;

// How long the wall stays fully revealed once the page behind it is ready,
// before it starts fading out. Must comfortably exceed CENTER_HOLD_MS +
// BURST_SPREAD_MS so the reveal always gets to finish playing out.
const MIN_HOLD_MS = 950;

const INTRO_HOLD_MS = 1500;
const INTRO_MAX_HOLD_MS = 5000;

type Phase = "intro" | "idle" | "closing" | "closed" | "opening";

function normalizePath(path: string) {
  return path.split("?")[0].split("#")[0] || "/";
}

// One cell per SPARK_SIZE px of viewport, so sparks tile the screen in a
// grid instead of landing on top of each other at random. The single cell
// closest to the viewport center is flagged isCenter — it's the one spark
// shown alone before the rest of the grid appears. Every other cell also
// carries a small random delay so, once they do start appearing, they
// multiply in over BURST_SPREAD_MS instead of all on the same frame.
function useGridCells(size: number) {
  const [cells, setCells] = useState<
    { x: number; y: number; delay: number; isCenter: boolean }[]
  >([]);

  useEffect(() => {
    function compute() {
      const cols = Math.max(1, Math.floor(window.innerWidth / size));
      const rows = Math.max(1, Math.floor(window.innerHeight / size));
      const cellW = window.innerWidth / cols;
      const cellH = window.innerHeight / rows;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const raw: { x: number; y: number; dist: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * cellW;
          const y = (r + 0.5) * cellH;
          raw.push({ x, y, dist: Math.hypot(x - centerX, y - centerY) });
        }
      }

      const centerIndex = raw.reduce(
        (closest, cell, i) => (cell.dist < raw[closest].dist ? i : closest),
        0
      );

      setCells(
        raw.map((cell, i) => ({
          x: cell.x,
          y: cell.y,
          delay: Math.random() * BURST_SPREAD_MS,
          isCenter: i === centerIndex,
        }))
      );
    }

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [size]);

  return cells;
}

// Each spark sits at a fixed grid cell. It fades in when visible becomes
// true (staggered by delay, if any) and fades out with no delay — all
// sparks together, all at once — once the new page is ready.
function Spark({
  x,
  y,
  visible,
  delay,
}: {
  x: number;
  y: number;
  visible: boolean;
  delay: number;
}) {
  return (
    <img
      src="/Red.svg"
      alt=""
      width={SPARK_SIZE}
      height={SPARK_SIZE}
      className="box-wall__spark"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    />
  );
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const cells = useGridCells(SPARK_SIZE);

  const [closeEntered, setCloseEntered] = useState(false);
  const [introEntered, setIntroEntered] = useState(false);
  const [revealStep, setRevealStep] = useState<"hidden" | "center" | "all">(
    "hidden"
  );
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const pendingHref = useRef<string | null>(null);
  const closedAtRef = useRef<number>(0);
  const lastKnownPathRef = useRef<string>("/");

  // Whether the wall is genuinely on screen right now (mount-hidden tricks
  // already resolved). Computed once here, rather than three separate
  // conditions, so effects below can depend on this single boolean — it
  // only flips value at the real "became visible" / "became hidden" edges,
  // not on every intermediate phase change (e.g. closing -> closed) that
  // happens while it's already true.
  const isEnteringIntro = phase === "intro" && !introEntered;
  const isIntro = phase === "intro" && introEntered;
  const isEnteringClose = phase === "closing" && !closeEntered;
  const wallPhase = isEnteringIntro
    ? "opening"
    : isIntro
      ? "closed"
      : isEnteringClose
        ? "opening"
        : phase;
  const sparksVisible = wallPhase === "closing" || wallPhase === "closed";

  // The homepage hero plays a video the intro wall should wait on, so it
  // never opens onto a black gap while the first frame is still loading.
  useEffect(() => {
    function onReady() {
      setHeroVideoReady(true);
    }
    window.addEventListener("hero-video-ready", onReady);
    return () => window.removeEventListener("hero-video-ready", onReady);
  }, []);

  // Intro boot sequence, replayed on every fresh page load. Starts from
  // "idle" (not rendered) so the static HTML itself always ships real page
  // content — the intro only kicks in once this client-only effect runs.
  useEffect(() => {
    lastKnownPathRef.current = normalizePath(window.location.pathname);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    document.body.style.overflow = "hidden";
    setPhase("intro");
  }, []);

  useEffect(() => {
    if (phase !== "intro") return;

    const isHome = normalizePath(pathname) === "/";
    if (!isHome) {
      const t = setTimeout(() => setPhase("opening"), INTRO_HOLD_MS);
      return () => clearTimeout(t);
    }

    if (heroVideoReady) {
      const t = setTimeout(() => setPhase("opening"), MIN_HOLD_MS);
      return () => clearTimeout(t);
    }

    const fallback = setTimeout(() => setPhase("opening"), INTRO_MAX_HOLD_MS);
    return () => clearTimeout(fallback);
  }, [phase, pathname, heroVideoReady]);

  // Keep the last-seen pathname in sync so the popstate handler below can
  // tell a real page change apart from an in-page hash jump.
  useEffect(() => {
    lastKnownPathRef.current = normalizePath(pathname);
  }, [pathname]);

  // Intercept internal link clicks so we can close the wall *before*
  // navigating, then swap the page while it's covered.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      event.stopPropagation();
      pendingHref.current = href;
      setCloseEntered(false);
      setPhase("closing");
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    function onPopState() {
      const newPath = normalizePath(window.location.pathname);
      if (newPath === lastKnownPathRef.current) return;

      pendingHref.current = null;
      setCloseEntered(false);
      setPhase("closing");
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (phase !== "closing" || closeEntered) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setCloseEntered(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [phase, closeEntered]);

  // Sparks mount already-visible on the very first render of "intro", so
  // without this the browser has nothing to transition *from* — opacity
  // just paints straight to 1 and every spark pops in together instead of
  // rippling out from the center. Mounting hidden for one frame first (the
  // same trick used for closeEntered above) gives it a real 0 -> 1 change
  // to animate, so transition-delay can stagger it properly.
  useEffect(() => {
    if (phase !== "intro" || introEntered) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIntroEntered(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [phase, introEntered]);

  // Drives the two-stage reveal: as soon as the wall is genuinely visible
  // (center spark's own mount-hidden trick has already resolved), show
  // just the center spark, hold for CENTER_HOLD_MS, then reveal the rest
  // of the grid. Depending on the single sparksVisible boolean (rather
  // than phase/introEntered/closeEntered separately) means this only
  // re-runs at the real "became visible" / "became hidden" edges — not on
  // every intermediate phase change (e.g. closing -> closed) that happens
  // while it's already true, which would otherwise restart the sequence
  // mid-reveal. Dropping back to "hidden" whenever it's not visible means
  // every spark (center included) fades out together, with no delay.
  useEffect(() => {
    if (!sparksVisible) {
      setRevealStep("hidden");
      return;
    }

    setRevealStep("center");
    const t = setTimeout(() => setRevealStep("all"), CENTER_HOLD_MS);
    return () => clearTimeout(t);
  }, [sparksVisible]);

  useEffect(() => {
    if (phase !== "closing") return;
    const t = setTimeout(() => {
      if (pendingHref.current) {
        router.push(pendingHref.current);
      }
      closedAtRef.current = Date.now();
      setPhase("closed");
    }, CLOSE_MS);
    return () => clearTimeout(t);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "closed") return;

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    const target = pendingHref.current;
    const arrived = !target || normalizePath(target) === pathname;

    if (arrived) {
      pendingHref.current = null;
      const elapsed = Date.now() - closedAtRef.current;
      const remainingHold = Math.max(0, MIN_HOLD_MS - elapsed);
      const t = setTimeout(() => setPhase("opening"), remainingHold);
      return () => clearTimeout(t);
    }

    const fallback = setTimeout(() => setPhase("opening"), MAX_WAIT_MS);
    return () => clearTimeout(fallback);
  }, [phase, pathname]);

  useEffect(() => {
    if (phase !== "opening") return;
    const t = setTimeout(() => {
      setPhase("idle");
      document.body.style.overflow = "";
    }, OPEN_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return <>{children}</>;

  const centerVisible = sparksVisible && revealStep !== "hidden";
  const othersVisible = sparksVisible && revealStep === "all";

  return (
    <>
      {children}

      <div className={`box-wall box-wall--${wallPhase}`} aria-hidden="true">
        {cells.map((cell, i) => (
          <Spark
            key={i}
            x={cell.x}
            y={cell.y}
            delay={cell.isCenter ? 0 : cell.delay}
            visible={cell.isCenter ? centerVisible : othersVisible}
          />
        ))}
      </div>
    </>
  );
}
