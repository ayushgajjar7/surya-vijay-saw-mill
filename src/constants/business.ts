export const BUSINESS = {
  name: "Surya Vijay Saw Mill",
  owner: "Madhav Patel", // Keeping existing since it wasn't specified to change
  phone: "9328646142",
  phoneFormatted: "+91 93286 46142",
  phoneHref: "tel:+919328646142",
  whatsapp: "9328646142",
  whatsappHref: "https://wa.me/919328646142",
  experience: "15+",
  experienceLabel: "15+ Years of Experience",
  established: "Since 2009",

  address: {
    line1: "L K Patel Timber Market",
    line2: "Narol Cir",
    city: "Narolgam, Ahmedabad",
    state: "Gujarat",
    pincode: "382405",
    full: "L K Patel Timber Market, Narol Cir, Narolgam, Ahmedabad, Gujarat 382405",
  },

  // Using a clean iframe-compatible google maps embed URL with the provided address
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Suryavijay%20Saw%20Mill,%20L%20K%20Patel%20Timber%20Market,%20Narolgam,%20Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed",

  googleMapsUrl:
    "https://www.google.com/maps/place/Suryavijay+Saw+Mill/@22.9739,72.5905,17z/data=!4m6!3m5!1s0x395e858a87c06eb3:0x12140a6646f77f9b!8m2!3d22.9742146!4d72.5904518!16s%2Fg%2F1tgxrycq?hl=en&entry=ttu",

  email: "suryavijaysaw@gmail.com",

  // Placeholder until owner provides GST number
  gst: "TO-BE-UPDATED",

  // Social media ?" not currently active, placeholders for future
  instagram: "",
  facebook: "",
  youtube: "",

  // Working hours ?" not confirmed, do not invent
  workingHours: "Contact us for current availability",

  // Website
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://surya-vijaysawmill.com",

  tagline: "Quality Timber. Custom Sizes. Reliable Supply.",
  heroHeading: "WOOD. CUT TO YOUR REQUIREMENT.",
  heroSubheading:
    "Quality timber, custom sizes and dependable supply for homes, furniture, interiors and commercial requirements.",
} as const;

export type Business = typeof BUSINESS;
