import type { MetadataRoute } from "next";
import { BUSINESS } from "@/constants/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Surya Vijay Saw Mill",
    short_name: "SVSM",
    description:
      "Timber & Wood Supplier in Ahmedabad. Custom sizes, cutting and delivery available.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3ED",
    theme_color: "#8B5E34",
    orientation: "portrait",
    lang: "en-IN",
    icons: [
      {
        src: "/assets/images/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["business", "shopping"],
    shortcuts: [
      {
        name: "Get a Quote",
        short_name: "Quote",
        description: "Request a timber quote",
        url: "/quote",
        icons: [{ src: "/assets/images/logo.svg", sizes: "any" }],
      },
      {
        name: "Custom Size",
        short_name: "Custom",
        description: "Custom size timber request",
        url: "/custom-size",
        icons: [{ src: "/assets/images/logo.svg", sizes: "any" }],
      },
    ],
  };
}
