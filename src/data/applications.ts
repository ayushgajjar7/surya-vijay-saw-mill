import { Application } from "@/types";
import { Images } from "@/constants/images";

export const APPLICATIONS: Application[] = [
  {
    id: "furniture",
    name: "Furniture",
    description:
      "From wardrobes and beds to dining tables and sofas — quality timber is the foundation of durable, beautiful furniture. We supply furniture-grade timber in the sizes carpenters and manufacturers need.",
    image: Images.applications.furniture,
    suitableProducts: ["Teak Wood", "Hardwood", "Furniture Timber", "Cut-to-Size Timber"],
    icon: "🪑",
  },
  {
    id: "doors",
    name: "Doors & Windows",
    description:
      "Door frames, window frames, shutters and panels require specific timber grades and dimensions. We supply timber for door and window manufacturing in standard and custom sizes.",
    image: Images.applications.doors,
    suitableProducts: [
      "Door & Window Timber",
      "Teak Wood",
      "Hardwood",
      "Cut-to-Size Timber",
    ],
    icon: "🚪",
  },
  {
    id: "interior",
    name: "Interior Work",
    description:
      "Interior designers and carpenters require precise timber dimensions for paneling, false ceilings, partitions and decorative elements. Custom cutting service available for your interior requirements.",
    image: Images.applications.interior,
    suitableProducts: [
      "Teak Wood",
      "Hardwood",
      "Furniture Timber",
      "Cut-to-Size Timber",
    ],
    icon: "🏠",
  },
  {
    id: "construction",
    name: "Construction",
    description:
      "Builders and contractors require reliable timber supply for formwork, scaffolding support, structural framing and general construction work. Bulk supply available.",
    image: Images.applications.construction,
    suitableProducts: [
      "Construction Timber",
      "Sawn Timber",
      "Softwood",
      "Timber Logs",
    ],
    icon: "🏗️",
  },
  {
    id: "windows",
    name: "Windows",
    description:
      "Timber windows require specific sizes and wood types for frames and shutters. We supply window timber in sizes to match your requirement, with custom cutting available.",
    image: Images.applications.windows,
    suitableProducts: [
      "Door & Window Timber",
      "Teak Wood",
      "Hardwood",
    ],
    icon: "🪟",
  },
  {
    id: "commercial",
    name: "Commercial & Industrial",
    description:
      "Hotels, offices, commercial establishments and industrial buyers require reliable bulk timber supply. We cater to commercial requirements with consistent availability and supply.",
    image: Images.applications.commercial,
    suitableProducts: [
      "Sawn Timber",
      "Hardwood",
      "Construction Timber",
      "Timber Logs",
    ],
    icon: "🏢",
  },
  {
    id: "custom",
    name: "Custom Requirements",
    description:
      "Have a requirement that doesn't fit a standard category? Share your wood type, dimensions and quantity. We will help you find the right timber for your specific project.",
    image: Images.applications.custom,
    suitableProducts: ["Cut-to-Size Timber", "Any Timber Type"],
    icon: "✂️",
  },
];
