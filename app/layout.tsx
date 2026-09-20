import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import siteInfo from "@/content/siteInfo.json";
import MainSiteWrapper from "@/components/ui/MainSiteWrapper";
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebrandthink.com";
const SITE_DESCRIPTION =
  "BrandThink helps modern brands build attention, distribution, and conversion systems using strategy, AI, content, creators, and performance marketing.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BrandThink — Growth Systems for Modern Brands",
    template: "%s | BrandThink",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "BrandThink",
    "growth marketing agency",
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

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "BrandThink",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: SITE_DESCRIPTION,
  email: siteInfo.email,
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3WDXP0WKFG"></script>
        <script
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
