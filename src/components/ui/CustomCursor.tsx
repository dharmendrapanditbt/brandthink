"use client";

import { useEffect, useRef, useState } from "react";

const RING_EASE = 0.12;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  // Lets any component request custom cursor text (e.g. a team photo
  // showing its member's designation on hover) without prop-drilling
  // through the whole tree down to this globally-mounted cursor.
  useEffect(() => {
    function handleCursorText(e: Event) {
      setCursorText((e as CustomEvent<string | null>).detail);
    }

    window.addEventListener("cursor-text", handleCursorText);
    return () => window.removeEventListener("cursor-text", handleCursorText);
  }, []);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId: number;
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotRef.current?.style.setProperty(
        "transform",
        `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      );

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest(
          'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-hover]'
        );
        isHovered = interactive;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * RING_EASE;
      ringY += (mouseY - ringY) * RING_EASE;
      const scale = isHovered ? "scale(1.4)" : "scale(1)";
      const transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) ${scale}`;
      if (ringRef.current) ringRef.current.style.transform = transform;
      if (textRef.current) textRef.current.style.transform = transform;
      frameId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", handleMouseMove);
    frameId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ opacity: cursorText ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ opacity: cursorText ? 0 : 1 }}
      />
      <div
        ref={textRef}
        className="custom-cursor-text"
        style={{ opacity: cursorText ? 1 : 0 }}
      >
        {cursorText}
      </div>
    </>
  );
}
