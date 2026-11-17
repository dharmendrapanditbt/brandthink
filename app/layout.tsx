import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import siteInfo from "@/content/siteInfo.json";
import MainSiteWrapper from "@/components/ui/MainSiteWrapper";
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebrandthink.com";
const SITE_DESCRIPTION =
  "BrandThink is a growth marketing agency and performance marketing partner for modern brands. We engineer a compounding growth engine and marketing systems using brand strategy, AI, MarTech, and performance marketing.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "BrandThink — Growth Systems & Performance Marketing for Modern Brands",
    template: "%s | BrandThink",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "BrandThink",
    "growth marketing agency",
    "growth engine",
    "growth systems",
    "brand strategy",
    "performance marketing",
    "AI marketing",
    "content strategy",
    "creative technology",
    "marketing agency India",
  ],
  authors: [{ name: "BrandThink" }],
  creator: "BrandThink",
  publisher: "BrandThink",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "BrandThink",
    title: "BrandThink — Growth Systems for Modern Brands",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BrandThink" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandThink — Growth Systems for Modern Brands",
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-heading", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "BrandThink",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: SITE_DESCRIPTION,
  email: "hello@thebrandthink.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `${SITE_URL}/contact/`,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: siteInfo.addressLocality,
    addressCountry: siteInfo.addressCountry,
  },
  areaServed: "Worldwide",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <meta name="google-site-verification" content="nI0TddYUZly_iSURipKMF1KNsC6yNlQ9t-LjhVtrDho" />
        {/* Critical CSS inlined to prevent render-blocking delay and layout flash */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: #0a0a0a;
                --foreground: #ededed;
                --color-dark-grey: #0a0a0a;
                --color-off-grey: #161616;
                --color-bt-red: #E8000E;
                color-scheme: dark;
              }
              html {
                background-color: #0a0a0a;
                color: #ededed;
                scrollbar-gutter: stable;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              body {
                margin: 0;
                background-color: #0a0a0a;
                color: #ededed;
                overflow-x: hidden;
              }
              .hero-section {
                min-height: 100vh;
                background-color: #0a0a0a;
                position: relative;
              }
            `,
          }}
        />
        {/* Google tag (gtag.js) deferred to avoid blocking critical rendering path */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-3WDXP0WKFG"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3WDXP0WKFG');
`,
          }}
        />
      </head>
      <body className={`${bebas.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
        <MainSiteWrapper>{children}</MainSiteWrapper>
      </body>
    </html>
  );
}
