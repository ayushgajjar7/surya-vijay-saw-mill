// TypeScript interfaces for all data models

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  image: string;
  applications: string[];
  sizeNote: string;
  customCutting: boolean;
  available: boolean;
  featured: boolean;
  relatedSlugs?: string[];
  availableForms?: string[];
  priceNote?: string;
}

export type ProductCategory =
  | "Hardwood"
  | "Softwood"
  | "Specialty";

export interface Application {
  id: string;
  name: string;
  description: string;
  image: string;
  suitableProducts: string[];
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  message: string;
  rating: number;
  date: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface WoodFinderItem {
  id: string;
  label: string;
  icon: string;
  description: string;
  suggestedProducts: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export type Language = "en" | "gu" | "hi";

export interface TranslationMap {
  [key: string]: string | TranslationMap;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email?: string;
  woodType: string;
  length: string;
  width: string;
  thickness: string;
  unit: string;
  quantity: string;
  purpose: string;
  deliveryLocation: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export interface WhatsAppMessageData {
  woodType?: string;
  length?: string;
  width?: string;
  thickness?: string;
  unit?: string;
  quantity?: string;
  purpose?: string;
  deliveryLocation?: string;
  message?: string;
  name?: string;
}
