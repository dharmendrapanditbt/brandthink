import {
  Shirt,
  Cloud,
  Store,
  Sparkles,
  Landmark,
  GraduationCap,
  HeartPulse,
  Coffee,
  Building2,
  Megaphone,
  Cookie,
  Footprints,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Shirt,
  Cloud,
  Store,
  Sparkles,
  Landmark,
  GraduationCap,
  HeartPulse,
  Coffee,
  Building2,
  Megaphone,
  Cookie,
  Footprints,
};

export default function CaseStudyVisual({
  icon,
  color,
  image,
  alt,
  clientName,
  compact = false,
}: {
  icon: string;
  color: string;
  image?: string;
  alt?: string;
  clientName?: string;
  compact?: boolean;
}) {
  const Icon = ICONS[icon] ?? Sparkles;

  if (image) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden border-b border-grey-1 bg-dark-grey ${compact ? "aspect-[2/1]" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt ?? ""}
          width={1280}
          height={640}
          loading="lazy"
          className={compact ? "absolute inset-0 h-full w-full object-cover" : "block h-auto w-full"}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-grey/80 via-transparent to-transparent" />

        <div
          className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border"
          style={{ borderColor: color, background: "#0a0a0acc" }}
        >
          <Icon size={16} strokeWidth={1.5} style={{ color }} />
        </div>

        {clientName && (
          <span
            className={`bebas absolute bottom-5 left-6 uppercase tracking-wide text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)] ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}
          >
            {clientName}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden border-b border-grey-1 ${compact ? "h-32" : "h-48"}`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}cc 45%, #0a0a0a 100%)`,
      }}
    >
      <Icon
        size={compact ? 110 : 150}
        strokeWidth={1}
        className="absolute -bottom-9 -right-9 text-black/25"
      />

      <div
        className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/20"
      >
        <Icon size={16} strokeWidth={1.5} className="text-white" />
      </div>

      {clientName && (
        <span
          className={`bebas absolute bottom-5 left-6 uppercase tracking-wide text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)] ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}
        >
          {clientName}
        </span>
      )}
    </div>
  );
}
