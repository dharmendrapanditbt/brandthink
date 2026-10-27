"use client";

import Link from "next/link";
import { useBookCallModal } from "@/components/ui/BookCallModal";
import content from "@/content/footer.json";
import siteInfo from "@/content/siteInfo.json";

const { tagline, copyright, columnLabels } = content;
const { logo, contactDetails, socials } = siteInfo;
const footerLinks = {
  services: content.services,
  company: content.company,
  // "Book a Strategy Call" and "Contact Us" bookend the shared social links
  // so every place on the site links to the same social accounts.
  connect: [
    content.connect[0],
    ...socials,
    content.connect[1],
  ],
};

export default function Footer() {
  const { open: openBookCallModal } = useBookCallModal();

  return (
    <footer className="border-t-2 border-bt-red bg-dark-grey">
      <div className="mx-auto px-6 py-16 md:px-12 lg:px-20 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <h2
              data-text={logo}
              className="glitch-hover bebas mb-4 text-2xl uppercase text-bt-red sm:text-3xl"
            >
              {logo}
            </h2>

            <p className="mb-8 max-w-sm text-light-grey">
              {tagline}
            </p>

            <ul className="space-y-2">
              {contactDetails.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-light-grey transition-colors hover:text-white"
                    >
                      → {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label} className="text-light-grey">
                    → {item.label}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
              {columnLabels.services}
            </p>

            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <span className="text-light-grey transition-colors hover:text-white">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
              {columnLabels.company}
            </p>

            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-light-grey transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
              {columnLabels.connect}
            </p>

            <ul className="space-y-3">
              {footerLinks.connect.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-light-grey transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={openBookCallModal}
                      className="text-light-grey transition-colors hover:text-white"
                    >
                      {item.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden border-t border-grey-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/footer_Idea_6.gif" alt={logo} width={2560} height={500} loading="lazy" className="block w-full" />
      </div>

      <div className="mx-auto flex flex-col items-center justify-between gap-4 border-t border-grey-1 px-6 py-8 sm:flex-row md:px-12 lg:px-20">
        <p className="text-sm text-light-grey">
          {`© ${new Date().getFullYear()} BrandThink. All Rights Reserved.`}
        </p>

        <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-light-grey">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="transition-colors hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
