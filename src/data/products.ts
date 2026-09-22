import { Product } from "@/types";
import { Images } from "@/constants/images";

export const PRODUCTS: Product[] = [
  {
    id: "teak-wood",
    name: "Teak Wood",
    slug: "teak-wood",
    category: "Hardwood",
    shortDescription:
      "Classic hardwood known for its natural durability and beauty — suitable for furniture, doors and premium interior work.",
    description:
      "Teak is one of the most sought-after hardwoods for quality furniture, door frames and interior work. It has a straight grain and a coarse, uneven texture with a naturally oily surface. We supply teak timber in various sizes and can cut to your required dimensions.",
    image: Images.products.teakWood,
    applications: [
      "Furniture",
      "Door Frames",
      "Window Frames",
      "Interior Work",
      "Decorative Work",
    ],
    sizeNote:
      "Available in various standard sizes. Custom cutting available as per requirement.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["hardwood", "door-window-timber", "furniture-timber"],
  },
  {
    id: "hardwood",
    name: "Hardwood",
    slug: "hardwood",
    category: "Hardwood",
    shortDescription:
      "A range of hardwood timber suitable for furniture manufacturing, structural and interior applications.",
    description:
      "We supply a variety of hardwood timber suitable for different requirements. Hardwood is generally used for furniture, doors, flooring, heavy construction and structural applications. Contact us for current availability and to discuss your specific requirement.",
    image: Images.products.hardwood,
    applications: [
      "Furniture",
      "Flooring",
      "Structural Work",
      "Doors",
      "Heavy Construction",
    ],
    sizeNote:
      "Available in multiple sizes. Custom cutting available on request.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["teak-wood", "sawn-timber", "furniture-timber"],
  },
  {
    id: "softwood",
    name: "Softwood",
    slug: "softwood",
    category: "Softwood",
    shortDescription:
      "Lightweight and versatile timber for general carpentry, construction formwork and interior applications.",
    description:
      "Softwood timber is widely used in general carpentry, construction, formwork, interior paneling and lightweight furniture. We carry softwood in various grades and sizes to suit different project requirements. Custom cutting available.",
    image: Images.products.softwood,
    applications: [
      "General Carpentry",
      "Construction Formwork",
      "Interior Paneling",
      "Lightweight Furniture",
      "Packaging",
    ],
    sizeNote: "Available in standard lengths. Custom cutting available.",
    customCutting: true,
    available: true,
    featured: false,
    relatedSlugs: ["sawn-timber", "construction-timber"],
  },
  {
    id: "sawn-timber",
    name: "Sawn Timber",
    slug: "sawn-timber",
    category: "Sawn Timber",
    shortDescription:
      "Ready sawn timber planks and sections in various dimensions for immediate use.",
    description:
      "Sawn timber is timber that has been cut to standard sizes at our mill. It is available in various cross-sections and lengths. We can provide sawn timber for immediate use or cut further to your specific dimensions.",
    image: Images.products.sawnTimber,
    applications: [
      "Construction",
      "Furniture",
      "Carpentry",
      "Structural",
      "General Use",
    ],
    sizeNote:
      "Multiple standard sizes available. Can be cut to custom dimensions.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["hardwood", "softwood", "cut-to-size-timber"],
  },
  {
    id: "timber-logs",
    name: "Timber Logs",
    slug: "timber-logs",
    category: "Timber Logs",
    shortDescription:
      "Raw timber logs available for bulk buyers and timber processors.",
    description:
      "We supply timber logs suitable for timber processors, sawmill operators and bulk buyers who require raw material. Contact us to enquire about current availability, wood types and pricing.",
    image: Images.products.timberLogs,
    applications: [
      "Timber Processing",
      "Sawmill Operations",
      "Bulk Supply",
      "Industrial Use",
    ],
    sizeNote: "Various sizes available. Contact for bulk enquiries.",
    customCutting: false,
    available: true,
    featured: false,
    relatedSlugs: ["hardwood", "sawn-timber"],
  },
  {
    id: "cut-to-size-timber",
    name: "Cut-to-Size Timber",
    slug: "cut-to-size-timber",
    category: "Cut-to-Size",
    shortDescription:
      "Timber cut exactly to your required length, width and thickness — share your dimensions and we'll help.",
    description:
      "Our custom cutting service allows you to specify the exact timber dimensions you need. Simply tell us the wood type, length, width, thickness and quantity. We will help you with availability and pricing for your specific requirement.",
    image: Images.products.cutToSize,
    applications: [
      "Custom Furniture",
      "Specific Sizes",
      "Construction",
      "Any Requirement",
    ],
    sizeNote:
      "Any size as per your requirement. Share your dimensions for a quote.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["teak-wood", "hardwood", "furniture-timber"],
  },
  {
    id: "door-window-timber",
    name: "Door & Window Timber",
    slug: "door-window-timber",
    category: "Door & Window",
    shortDescription:
      "Timber suitable for door frames, window frames, shutters and related carpentry.",
    description:
      "We supply timber commonly used for door and window frames, shutters and associated carpentry work. Available in sizes suitable for standard and custom door/window requirements. Custom cutting available.",
    image: Images.products.doorWindow,
    applications: [
      "Door Frames",
      "Window Frames",
      "Shutters",
      "Architraves",
      "Door Panels",
    ],
    sizeNote:
      "Sizes suitable for standard and custom door/window work. Custom cutting available.",
    customCutting: true,
    available: true,
    featured: false,
    relatedSlugs: ["teak-wood", "hardwood", "furniture-timber"],
  },
  {
    id: "furniture-timber",
    name: "Furniture Timber",
    slug: "furniture-timber",
    category: "Furniture",
    shortDescription:
      "Timber selected for furniture manufacturing — suitable for carpenters, furniture makers and interior work.",
    description:
      "We supply timber widely used in furniture manufacturing. Suitable for carpenters, furniture manufacturers, interior designers and home owners requiring quality wood for furniture. Available in various species and sizes. Custom cutting available.",
    image: Images.products.furnitureTimber,
    applications: [
      "Furniture Manufacturing",
      "Cabinet Making",
      "Interior Work",
      "Home Furniture",
      "Commercial Furniture",
    ],
    sizeNote:
      "Various sizes available. Custom cutting to your furniture dimensions.",
    customCutting: true,
    available: true,
    featured: true,
    relatedSlugs: ["teak-wood", "hardwood", "cut-to-size-timber"],
  },
  {
    id: "construction-timber",
    name: "Construction Timber",
    slug: "construction-timber",
    category: "Construction",
    shortDescription:
      "Timber for construction, formwork, structural and civil applications.",
    description:
      "We supply timber used in construction including formwork, scaffolding supports, structural framing and general civil work. Available for bulk supply to contractors, builders and construction companies.",
    image: Images.products.constructionTimber,
    applications: [
      "Formwork",
      "Scaffolding",
      "Structural Framing",
      "General Construction",
      "Civil Work",
    ],
    sizeNote:
      "Bulk supply available. Contact for pricing and availability.",
    customCutting: true,
    available: true,
    featured: false,
    relatedSlugs: ["sawn-timber", "softwood", "timber-logs"],
  },
  {
    id: "rough-timber",
    name: "Rough Timber",
    slug: "rough-timber",
    category: "Sawn Timber",
    shortDescription:
      "Rough-sawn timber for projects where finishing is done on-site.",
    description:
      "Rough sawn timber is timber that has been cut to size without further surface finishing. Suitable for applications where surface finishing is done at the project site. Available in various sizes.",
    image: Images.products.roughTimber,
    applications: [
      "Construction",
      "General Carpentry",
      "Site Finishing",
      "Structural",
    ],
    sizeNote: "Available in multiple sizes. Custom cutting available.",
    customCutting: true,
    available: true,
    featured: false,
    relatedSlugs: ["sawn-timber", "softwood", "construction-timber"],
  },
  {
    id: "other-requirements",
    name: "Other Wood Requirements",
    slug: "other-requirements",
    category: "Specialty",
    shortDescription:
      "Have a specific timber requirement? Tell us what you need and we will help.",
    description:
      "If you have a specific timber requirement not listed here, please contact us. We work with a range of wood types and can help you find suitable timber for your project. Share your requirement and we will assist.",
    image: Images.products.other,
    applications: ["Any Requirement"],
    sizeNote: "Contact us with your specific requirement.",
    customCutting: true,
    available: true,
    featured: false,
    relatedSlugs: ["cut-to-size-timber"],
  },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Hardwood",
  "Softwood",
  "Sawn Timber",
  "Timber Logs",
  "Cut-to-Size",
  "Specialty",
  "Construction",
  "Furniture",
  "Door & Window",
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
