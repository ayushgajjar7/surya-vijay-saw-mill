import { Product } from "@/types";
import { Images } from "@/constants/images";

export const PRODUCTS: Product[] = [
  {
    id: "teak-wood",
    name: "Teak Wood",
    slug: "teak-wood",
    category: "Hardwood",
    shortDescription: "Premium hardwood known for its natural durability, strength, and beautiful grain.",
    description: "Teak is one of the most sought-after hardwoods for quality furniture, door frames, and interior work. It has a straight grain and a naturally oily surface that makes it highly durable.",
    image: Images.products.teakWood,
    availableForms: ["Timber Planks", "Sections", "Beams", "Custom Cut Sizes"],
    applications: ["Doors", "Furniture", "Windows", "Frames", "Interior applications"],
    sizeNote: "Available in custom sizes based on requirement.",
    priceNote: "Price available on enquiry.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["neem-wood", "sal-wood", "mango-wood"],
  },
  {
    id: "neem-wood",
    name: "Neem Wood",
    slug: "neem-wood",
    category: "Hardwood",
    shortDescription: "Strong and termite-resistant wood, excellent for making durable furniture and frames.",
    description: "Neem wood is highly valued for its natural termite resistance and strength. It is a dense, durable hardwood that works well for structural uses and long-lasting furniture.",
    image: Images.products.hardwood,
    availableForms: ["Timber Planks", "Sections", "Custom Cut Sizes"],
    applications: ["Furniture", "Door Frames", "Window Frames", "Bed Frames", "Agricultural Tools"],
    sizeNote: "Available in custom sizes based on requirement.",
    priceNote: "Price available on enquiry.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["teak-wood", "mango-wood"],
  },
  {
    id: "mango-wood",
    name: "Mango Wood",
    slug: "mango-wood",
    category: "Hardwood",
    shortDescription: "Sustainable and versatile wood with unique grain patterns, popular for modern furniture.",
    description: "Mango wood is a strong, sustainable hardwood with unique, varied grain patterns. It is moderately heavy and takes finishes well, making it very popular for modern household furniture.",
    image: Images.products.sawnTimber,
    availableForms: ["Timber Planks", "Custom Cut Sizes"],
    applications: ["Furniture", "Cabinets", "Shelving", "Interior Paneling", "Decorative Items"],
    sizeNote: "Available in custom sizes based on requirement.",
    priceNote: "Price available on enquiry.",
    customCutting: true,
    available: true,
    featured: false,
    relatedSlugs: ["neem-wood", "pine-wood"],
  },
  {
    id: "pine-wood",
    name: "Pine Wood",
    slug: "pine-wood",
    category: "Softwood",
    shortDescription: "Lightweight and affordable softwood, ideal for packaging, formwork, and lightweight furniture.",
    description: "Pine wood is a widely used softwood known for its pale color and straight grain. It is lightweight, easy to work with, and highly affordable, making it perfect for both temporary structures and interior furniture.",
    image: Images.products.softwood,
    availableForms: ["Planks", "Battens", "Custom Cut Sizes"],
    applications: ["Packaging", "Construction Formwork", "Lightweight Furniture", "Pallets", "Interior Paneling"],
    sizeNote: "Available in custom sizes based on requirement.",
    priceNote: "Price available on enquiry.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["mango-wood", "other-timber"],
  },
  {
    id: "sal-wood",
    name: "Sal Wood",
    slug: "sal-wood",
    category: "Hardwood",
    shortDescription: "Extremely heavy and tough timber, primarily used for heavy construction and strong frames.",
    description: "Sal wood is one of the toughest and heaviest timbers available. Due to its exceptional strength and durability, it is heavily favored for structural frames, beams, and heavy-duty construction.",
    image: Images.products.roughTimber,
    availableForms: ["Beams", "Heavy Sections", "Custom Cut Sizes"],
    applications: ["Door & Window Frames", "Structural Beams", "Heavy Construction", "Bridges", "Railway Sleepers"],
    sizeNote: "Available in custom sizes based on requirement.",
    priceNote: "Price available on enquiry.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["teak-wood", "neem-wood"],
  },
  {
    id: "other-timber",
    name: "Other Timber",
    slug: "other-timber",
    category: "Specialty",
    shortDescription: "Have a specific timber requirement? Share what you need and we will check our stock.",
    description: "Beyond our standard species, we often carry or can arrange other timber varieties. If you have a specific requirement for a specialized project, please get in touch.",
    image: Images.products.other,
    availableForms: ["Custom Forms", "Logs", "Sawn Timber"],
    applications: ["Any Requirement", "Specialty Projects"],
    sizeNote: "Contact us with your specific requirement.",
    priceNote: "Price available on enquiry.",
    customCutting: true,
    available: true,
    featured: false,
    relatedSlugs: ["teak-wood", "pine-wood"],
  },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Hardwood",
  "Softwood",
  "Specialty",
] as const;

export type ProductCategoryFilter = (typeof PRODUCT_CATEGORIES)[number];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return PRODUCTS.filter(
    (p) =>
      product.relatedSlugs?.includes(p.slug) && p.slug !== product.slug
  ).slice(0, 3);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}
