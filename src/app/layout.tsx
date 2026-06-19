import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE, siteUrl } from "@/lib/site";
import { ThemeScript } from "@/components/theme-script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE.name} · Afrofusion home catering`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Afrofusion catering",
    "Nigerian catering",
    "Caribbean catering",
    "private dining",
    "wedding catering",
    "corporate catering",
    "Chef P's Kitchen",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} · Afrofusion home catering`,
    description: SITE.description,
    url: siteUrl(),
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: SITE.name }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Afrofusion home catering`,
    description: SITE.description,
    images: ["/brand/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf2e3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh bg-surface text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
