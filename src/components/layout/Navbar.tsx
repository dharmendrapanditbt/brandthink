"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useBookCallModal } from "@/components/ui/BookCallModal";
import HoverFlipText from "@/components/ui/HoverFlipText";
import { getLenisInstance, SCROLL_OFFSET } from "@/lib/lenis";
import { serviceLinks } from "@/lib/services";
import content from "@/content/navbar.json";
import siteInfo from "@/content/siteInfo.json";

const { ctaLabel } = content;
const { logo, nav: navLinks } = siteInfo;

// Same easing as the Book Call modal, so the motion matches the rest of the site.
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

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
  const [servicesOpen, setServicesOpen] = useState(false);
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
    setServicesOpen(false);
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
          {navLinks.map((link) =>
            link.href === "/services" ? (
              // Services opens a dropdown of every service on hover or
              // keyboard focus; the link itself still goes to /services.
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onFocus={() => setServicesOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setServicesOpen(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setServicesOpen(false);
                }}
              >
                <Link
                  href={link.href}
                  aria-expanded={servicesOpen}
                  className="nav-underline inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className={`transition-transform duration-500 ${EASE} motion-reduce:transition-none ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {/* Always rendered (hidden when closed) so crawlers see the
                    service links in the HTML. pt bridges the gap down to the
                    navbar's bottom edge so the pointer can reach the panel. */}
                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-[30px] transition-[opacity,visibility,translate] duration-300 ${EASE} motion-reduce:transition-none ${
                    servicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="relative min-w-max border border-grey-1 bg-dark-grey shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                    {/* Red line draws across the top edge, like the nav
                        link underline. */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -top-px h-0.5 origin-left bg-bt-red transition-transform duration-500 ${EASE} motion-reduce:transition-none ${
                        servicesOpen ? "scale-x-100 delay-100" : "scale-x-0"
                      }`}
                    />

                    <ul className="py-2">
                      {serviceLinks.map((service, index) => (
                        <li
                          key={service.href}
                          // Items cascade in one after another when opening,
                          // and fade out together when closing.
                          style={{
                            transitionDelay: servicesOpen
                              ? `${80 + index * 45}ms`
                              : "0ms",
                          }}
                          className={`transition-[opacity,translate] duration-300 ${EASE} motion-reduce:transition-none ${
                            servicesOpen
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-2 opacity-0"
                          }`}
                        >
                          <Link
                            href={service.href}
                            className="group/item relative block px-6 py-3 text-xs transition-colors duration-300 hover:bg-off-grey hover:text-white"
                          >
                            <span
                              aria-hidden="true"
                              className={`absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-bt-red transition-transform duration-300 ${EASE} group-hover/item:scale-y-100 motion-reduce:transition-none`}
                            />
                            <span
                              className={`inline-block transition-transform duration-300 ${EASE} group-hover/item:translate-x-1 motion-reduce:transition-none`}
                            >
                              {service.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="nav-underline transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
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
            <Fragment key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => {
                  setIsOpen(false);
                  handleNavLinkClick(e, link.href);
                }}
                className="py-3 text-sm uppercase tracking-[0.1em] text-light-grey transition-colors hover:text-white"
              >
                {link.label}
              </Link>

              {link.href === "/services" && (
                <div className="mb-2 flex flex-col border-l border-grey-1 pl-4">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setIsOpen(false)}
                      className="py-2 text-xs uppercase tracking-[0.1em] text-light-grey transition-colors hover:text-white"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </Fragment>
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
