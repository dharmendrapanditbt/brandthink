"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useBookCallModal } from "@/components/ui/BookCallModal";
import HoverFlipText from "@/components/ui/HoverFlipText";
import { getLenisInstance, SCROLL_OFFSET } from "@/lib/lenis";
import content from "@/content/navbar.json";
import siteInfo from "@/content/siteInfo.json";

const { ctaLabel } = content;
const { logo, nav: navLinks } = siteInfo;

function handleNavLinkClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string
) {
  const [path, hash] = href.split("#");
  if (!hash) return;
  if (window.location.pathname !== (path || "/")) return;

  event.preventDefault();

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(`#${hash}`, { offset: SCROLL_OFFSET });
  } else {
    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openBookCallModal } = useBookCallModal();
  const pathname = usePathname();

  // The site's page-transition wall intercepts internal link clicks (to run
  // its own animated navigation) before our Link's onClick ever fires, so
  // closing the menu on click can't be relied on for real page changes.
  // Closing on pathname change instead works regardless of how the
  // navigation actually happened, and the wall is already fully opaque by
  // the time the URL updates, so there's no visible flash of an open menu.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-grey-1 bg-dark-grey/90 backdrop-blur">
      <div className="absolute inset-y-0 left-0 w-1 bg-dark-grey" />

      <div className="mx-auto flex h-20 items-center justify-between px-6 md:px-12 lg:px-20">
        <Link href="/" className="flex h-full items-center py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brandthink-logo.webp"
            alt={logo}
            width={256}
            height={256}
            className="h-full w-auto"
          />
        </Link>

        <div className="hidden gap-10 text-sm uppercase tracking-[0.1em] text-light-grey md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="nav-underline transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={openBookCallModal}
          className="btn-brand hidden bg-bt-red text-white md:inline-flex"
        >
          <HoverFlipText text={ctaLabel} />
        </button>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="text-white md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-1 border-t border-grey-1 bg-dark-grey px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                setIsOpen(false);
                handleNavLinkClick(e, link.href);
              }}
              className="py-3 text-sm uppercase tracking-[0.1em] text-light-grey transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openBookCallModal();
            }}
            className="btn-brand mt-4 bg-bt-red text-white"
          >
            <HoverFlipText text={ctaLabel} />
          </button>
        </div>
      )}
    </nav>
  );
}
