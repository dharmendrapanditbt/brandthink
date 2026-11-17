"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProtectedEmailProps {
  user?: string;
  domain?: string;
  className?: string;
  prefix?: string;
}

export default function ProtectedEmail({
  user = "adityaraj",
  domain = "thebrandthink.com",
  className = "text-light-grey transition-colors hover:text-white",
  prefix = "→ ",
}: ProtectedEmailProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Link
        href="/contact/"
        className={className}
        title="Send us a message via contact form"
      >
        {prefix}Send us a message
      </Link>
    );
  }

  const email = `${user}@${domain}`;

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = `mailto:${email}`;
      }}
    >
      {prefix}{email}
    </a>
  );
}
