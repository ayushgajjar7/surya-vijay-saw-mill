/**
 * Centralized image registry.
 * Replace stock URLs with real company photos when available.
 * Never change component code — only update this file.
 */

export const Images = {
  logo: "/assets/images/logo.png",
  logoWhite: "/assets/images/logo.png",
  favicon: "/assets/images/favicon.ico",
  ogImage: "/assets/images/og-image.jpg",

  hero: {
    main: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1920&q=85",
    overlay: "/assets/images/wood-grain-overlay.png",
  },

  about: {
    main: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    secondary:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },

  products: {
    teakWood:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    hardwood:
      "https://images.unsplash.com/photo-1603204077167-2fa0397f591c?w=800&q=80",
    softwood:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80",
    sawnTimber:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    timberLogs:
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0a9b2e?w=800&q=80",
    cutToSize:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    doorWindow:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    furnitureTimber:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    constructionTimber:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    roughTimber:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    other:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80",
  },

  applications: {
    furniture:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    doors:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    windows:
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80",
    interior:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    construction:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    commercial:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    custom:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
  },

  gallery: [
    {
      id: "g1",
      src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
      alt: "Timber stack at saw mill",
      category: "Timber Stock",
    },
    {
      id: "g2",
      src: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80",
      alt: "Wood planks arranged for supply",
      category: "Wood Supply",
    },
    {
      id: "g3",
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      alt: "Timber yard with stacked wood",
      category: "Timber Yard",
    },
    {
      id: "g4",
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      alt: "Furniture made from quality timber",
      category: "Furniture",
    },
    {
      id: "g5",
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      alt: "Sawn timber planks",
      category: "Sawn Timber",
    },
    {
      id: "g6",
      src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
      alt: "Premium wood for furniture use",
      category: "Furniture Timber",
    },
    {
      id: "g7",
      src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      alt: "Interior woodwork",
      category: "Interior Work",
    },
    {
      id: "g8",
      src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
      alt: "Commercial timber supply",
      category: "Commercial",
    },
    {
      id: "g9",
      src: "https://images.unsplash.com/photo-1603204077167-2fa0397f591c?w=800&q=80",
      alt: "Hardwood timber selection",
      category: "Hardwood",
    },
  ],

  timberYard: [
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",
    "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  ],
} as const;
