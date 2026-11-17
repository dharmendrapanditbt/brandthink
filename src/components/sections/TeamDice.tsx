"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

type Member = {
  name: string;
  designation: string;
  photo?: string;
};

const FACE_PALETTE = [
  "#E8000E",
  "#F59E0B",
  "#14B8A6",
  "#3B82F6",
  "#A78BFA",
  "#EC4899",
  "#22C55E",
  "#06B6D4",
  "#FF6B35",
  "#8B5CF6",
];

const VH_PER_MEMBER = 70;
const MAX_FACE_SIZE = 500;
const MIN_FACE_SIZE = 220;

// The 6 physical faces of the cube. Each is defined purely by its own
// placement transform, using a single axis (front/right/back/left rotate
// only on Y, top/bottom rotate only on X) — that's what makes it possible
// to compute the exact inverse rotation needed to bring any one of them to
// the front, with no 3D math beyond negating one number.
const FACE_DEFS = [
  { id: 0, baseX: 0, baseY: 0 }, // front
  { id: 1, baseX: 0, baseY: 90 }, // right
  { id: 2, baseX: 0, baseY: 180 }, // back
  { id: 3, baseX: 0, baseY: 270 }, // left
  { id: 4, baseX: 90, baseY: 0 }, // top
  { id: 5, baseX: -90, baseY: 0 }, // bottom
] as const;

function buildFaceSlots(faceSize: number) {
  return FACE_DEFS.map((face) => ({
    slotIndex: face.id,
    transform: `rotateY(${face.baseY}deg) rotateX(${face.baseX}deg) translateZ(${faceSize / 2}px)`,
  }));
}

// Shrinks the cube to fit small viewports; 48px matches the section's
// tightest horizontal padding (px-6) and 160px leaves room for the sticky
// header plus breathing space above/below the cube.
function computeFaceSize() {
  if (typeof window === "undefined") return MAX_FACE_SIZE;
  const available = Math.min(
    window.innerWidth - 48,
    window.innerHeight - 160
  );
  return Math.round(
    Math.max(MIN_FACE_SIZE, Math.min(MAX_FACE_SIZE, available))
  );
}

// The order the cube visits its 6 faces, alternating side (Y-axis) and
// top/bottom (X-axis) turns so it genuinely tumbles in multiple directions
// instead of spinning flat on one axis.
const VISIT_ORDER = [0, 1, 4, 2, 5, 3];
const Y_AXIS_SLOTS = new Set([0, 1, 2, 3]);
const CYCLE_POSITION = new Map(VISIT_ORDER.map((slot, i) => [slot, i]));
// Fixed target Y for each side slot within a single lap; top/bottom don't
// touch Y, so it's only ever set when the target is a side.
const BASE_Y_FOR_SLOT: Record<number, number> = { 0: 0, 1: -90, 2: -180, 3: -270 };
const BASE_X_FOR_SLOT: Record<number, number> = { 4: -90, 5: 90 };

// Precomputes the container's (rotateX, rotateY) at every step. Top/bottom
// faces have zero Y in their own placement, so the container's Y must land
// on an exact multiple of 360 whenever one of them is shown — otherwise the
// leftover yaw from whichever side was last visible skews them sideways.
// Y accumulates by a full -360 each lap (rather than resetting to 0) so
// side-to-side turns never snap backwards; top/bottom simply use that lap's
// base value directly, which is always a clean multiple of 360.
function buildOrientationTargets(totalSteps: number) {
  const xs: number[] = [];
  const ys: number[] = [];
  let lapsCompleted = 0;

  for (let step = 0; step <= totalSteps; step++) {
    const posInCycle = step % 6;
    if (posInCycle === 0 && step > 0) lapsCompleted += 1;
    const slot = VISIT_ORDER[posInCycle];
    const yBase = lapsCompleted * -360;

    if (Y_AXIS_SLOTS.has(slot)) {
      xs.push(0);
      ys.push(yBase + BASE_Y_FOR_SLOT[slot]);
    } else {
      xs.push(BASE_X_FOR_SLOT[slot]);
      ys.push(yBase);
    }
  }

  return { xs, ys };
}

// Which member a fixed face should currently display. Content swaps to the
// next member one step after that face leaves the front (i.e. while it's
// off tumbling out of view), not the instant it's about to arrive again —
// otherwise it visibly pops to a different member right as it comes back
// into focus instead of already showing the right one.
function memberIndexForSlot(slot: number, floorStep: number, total: number) {
  const posInCycle = floorStep % 6;
  const cyclePos = CYCLE_POSITION.get(slot) ?? 0;
  const stepsUntilFront = ((cyclePos - posInCycle) % 6 + 6) % 6;
  const aheadTarget = floorStep + stepsUntilFront;
  const priorTarget = aheadTarget - 6;
  const target = stepsUntilFront === 5 && priorTarget >= 0 ? priorTarget : aheadTarget;
  return Math.min(Math.max(target, 0), total - 1);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function FacePanel({ member, color }: { member: Member; color: string }) {
  function handleMouseEnter() {
    if (!member.designation) return;
    window.dispatchEvent(new CustomEvent("cursor-text", { detail: member.designation }));
  }

  function handleMouseLeave() {
    window.dispatchEvent(new CustomEvent("cursor-text", { detail: null }));
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden border border-white/10 [backface-visibility:hidden]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {member.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo}
          alt={member.name}
          width={800}
          height={800}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: color }}
        >
          <span className="bebas text-4xl text-white/90 sm:text-5xl md:text-6xl">
            {initials(member.name)}
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="block text-center text-sm uppercase tracking-[0.15em] text-white">
          {member.name}
        </span>
      </div>
    </div>
  );
}

export default function TeamDice({ members }: { members: Member[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [faceSize, setFaceSize] = useState(MAX_FACE_SIZE);

  useEffect(() => {
    function measure() {
      setFaceSize(computeFaceSize());
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const faceSlots = useMemo(() => buildFaceSlots(faceSize), [faceSize]);

  const totalSteps = members.length - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const { stepBreakpoints, xTargets, yTargets } = useMemo(() => {
    const { xs, ys } = buildOrientationTargets(totalSteps);
    const breakpoints = Array.from({ length: totalSteps + 1 }, (_, i) =>
      totalSteps === 0 ? 0 : i / totalSteps
    );
    return { stepBreakpoints: breakpoints, xTargets: xs, yTargets: ys };
  }, [totalSteps]);

  const rotateX = useTransform(scrollYProgress, stepBreakpoints, xTargets);
  const rotateY = useTransform(scrollYProgress, stepBreakpoints, yTargets);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(totalSteps, Math.max(0, Math.round(latest * totalSteps)));
    setActiveIndex(step);
  });

  function handleNameClick(index: number) {
    const section = sectionRef.current;
    if (!section || totalSteps === 0) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    const targetY = sectionTop + (index / totalSteps) * scrollableDistance;

    window.scrollTo(0, targetY);
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark-grey"
      style={{ height: `${members.length * VH_PER_MEMBER}vh` }}
    >
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center overflow-hidden">
        <div className="mx-auto grid w-full items-center gap-12 px-6 md:px-12 lg:grid-cols-[320px_1fr] lg:px-20">
          <ul className="hidden flex-col gap-4 lg:flex">
            {members.map((member, index) => (
              <li key={member.name}>
                <button
                  type="button"
                  onClick={() => handleNameClick(index)}
                  className={`bebas text-left text-4xl uppercase tracking-wide transition-colors hover:text-white ${
                    index === activeIndex ? "text-bt-red" : "text-grey-1"
                  }`}
                >
                  {member.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-center" style={{ perspective: 1800 }}>
            <motion.div
              className="relative"
              style={{
                width: faceSize,
                height: faceSize,
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
              }}
            >
              {faceSlots.map((slot) => {
                const memberIndex = memberIndexForSlot(
                  slot.slotIndex,
                  activeIndex,
                  members.length
                );
                const member = members[memberIndex];

                return (
                  <div
                    key={slot.slotIndex}
                    className="absolute inset-0"
                    style={{
                      transform: slot.transform,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <FacePanel
                      member={member}
                      color={FACE_PALETTE[memberIndex % FACE_PALETTE.length]}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
