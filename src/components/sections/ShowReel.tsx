"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import content from "@/content/showreel.json";

const TIMER_LIMIT_MS = 40000;

function formatTimecode(ms: number) {
  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

export default function ShowReel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (isPlaying) return;
    const start = Date.now();
    const id = setInterval(() => {
      const next = Date.now() - start;
      if (next >= TIMER_LIMIT_MS) {
        setElapsed(TIMER_LIMIT_MS);
        clearInterval(id);
        return;
      }
      setElapsed(next);
    }, 47);
    return () => clearInterval(id);
  }, [isPlaying]);

  return (
    <section className="bg-dark-grey py-32">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <p
          data-text={content.eyebrow}
          className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
        >
          {content.eyebrow}
        </p>

        <Reveal>
          <h2 className="bebas mb-8 max-w-3xl text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.heading.line1}
            <span className="block text-bt-red">
              {content.heading.highlight}
            </span>
          </h2>
        </Reveal>

        <p className="mb-12 max-w-2xl text-base text-light-grey sm:text-lg">
          {content.description}
        </p>

        <Reveal
          delay={0.1}
          className="scan-hover relative mx-auto aspect-video w-full max-w-3xl overflow-hidden border border-grey-1 bg-black"
        >
          {isPlaying ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${content.videoId}?autoplay=1`}
              title={`${content.heading.line1} ${content.heading.highlight}`}
              allow="accelerated-video; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label="Play video"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/showreel-poster.jpg"
                alt={`${content.heading.line1} ${content.heading.highlight}`}
                loading="lazy"
                decoding="async"
                width={848}
                height={480}
                className="absolute inset-0 h-full w-full object-cover grayscale-[35%] contrast-110 transition-all duration-500 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-dark-grey/40 transition-colors group-hover:bg-dark-grey/20" />

              {/* Camera viewfinder frame */}
              <div className="pointer-events-none absolute inset-3 border border-white/25 sm:inset-4">
                <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-bt-red" />
                <span className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-bt-red" />
                <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-bt-red" />
                <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-bt-red" />
              </div>

              <div className="absolute left-6 top-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-bt-red" />
                Rec
              </div>

              <div className="absolute left-1/2 top-6 -translate-x-1/2 font-mono text-xs tracking-[0.1em] text-white/90">
                {formatTimecode(elapsed)}
              </div>

              <div className="absolute bottom-6 right-6 flex gap-1.5 font-mono text-[10px] text-white/80">
                <span className="border border-white/40 px-1.5 py-0.5">HD</span>
              </div>

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-bt-red text-white shadow-[0_0_40px_rgba(232,0,14,0.5)] transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                <Play size={28} fill="currentColor" className="ml-1" />
              </div>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
