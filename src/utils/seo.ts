import { Metadata } from "next";
import { BUSINESS } from "@/constants/business";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}

export function generateMetadata({
  title,
  description,
  path = "",
  keywords = [],
  image,
}: SEOProps): Metadata {
  const url = `${BUSINESS.siteUrl}${path}`;
  const ogImage = image || `${BUSINESS.siteUrl}/assets/images/og-image.jpg`;

  const defaultKeywords = [
    "timber supplier Ahmedabad",
    "wood supplier Ahmedabad",
    "saw mill Ahmedabad",
    "custom size timber",
    "wood cutting Ahmedabad",
    "teak wood Ahmedabad",
    "timber dealer Ahmedabad",
    "Surya Vijay Saw Mill",
    "Narolgam timber",
    "Isanpur wood market",
  ];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: BUSINESS.owner }],
    creator: BUSINESS.name,
    publisher: BUSINESS.name,
    metadataBase: new URL(BUSINESS.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BUSINESS.siteUrl,
  name: BUSINESS.name,
  description:
    "Timber and wood supplier in Ahmedabad offering custom size cutting, bulk supply and delivery. Established timber dealer at Rajbai Patel Timber Market.",
  url: BUSINESS.siteUrl,
  telephone: `+91${BUSINESS.phone}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}`,
    addressLocality: "Narolgam, Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: BUSINESS.address.pincode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "22.9700",
    longitude: "72.6200",
  },
  priceRange: "Contact for pricing",
  servesCuisine: null,
  hasMap: BUSINESS.googleMapsUrl,
  sameAs: [],
  foundingDate: "2009",
  founder: {
    "@type": "Person",
    name: BUSINESS.owner,
  },
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BUSINESS.name,
  url: BUSINESS.siteUrl,
  description:
    "Surya Vijay Saw Mill - Quality timber and wood supplier in Ahmedabad",
  inLanguage: ["en", "gu", "hi"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${BUSINESS.siteUrl}/products?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
