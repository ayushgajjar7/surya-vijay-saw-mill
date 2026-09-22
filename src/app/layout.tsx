import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA } from "@/utils/seo";
import { BUSINESS } from "@/constants/business";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8B5E34" },
    { media: "(prefers-color-scheme: dark)", color: "#11100E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: {
    default: "Surya Vijay Saw Mill | Timber & Wood Supplier in Ahmedabad",
    template: "%s | Surya Vijay Saw Mill",
  },
  description:
    "Surya Vijay Saw Mill supplies a wide range of timber and wood with custom cutting and delivery options in Ahmedabad, Gujarat. Contact for your required wood size and quantity.",
  keywords: [
    "timber supplier Ahmedabad",
    "wood supplier Ahmedabad",
    "saw mill Ahmedabad",
    "timber dealer Ahmedabad",
    "teak wood supplier Ahmedabad",
    "custom size timber",
    "wood cutting Ahmedabad",
    "Narolgam timber market",
    "Rajbai Patel timber market",
    "Surya Vijay Saw Mill",
    "Madhav Patel timber",
    "Isanpur timber",
    "Gujarat timber supplier",
  ],
  authors: [{ name: BUSINESS.owner }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BUSINESS.name,
    title: "Surya Vijay Saw Mill | Timber & Wood Supplier in Ahmedabad",
    description:
      "Quality timber, custom sizes and dependable supply in Ahmedabad, Gujarat. 15+ years experience.",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Surya Vijay Saw Mill - Timber Supplier Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surya Vijay Saw Mill | Timber & Wood Supplier in Ahmedabad",
    description:
      "Quality timber, custom sizes and dependable supply in Ahmedabad, Gujarat.",
  },
  icons: {
    icon: [
      { url: "/assets/images/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/assets/images/logo.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('svsm-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_SCHEMA),
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
