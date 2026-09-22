export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Teak Wood", href: "/products/teak-wood" },
      { label: "Hardwood", href: "/products/hardwood" },
      { label: "Softwood", href: "/products/softwood" },
      { label: "Sawn Timber", href: "/products/sawn-timber" },
      { label: "Timber Logs", href: "/products/timber-logs" },
      { label: "Cut-to-Size Timber", href: "/products/cut-to-size-timber" },
      { label: "Door & Window Timber", href: "/products/door-window-timber" },
      { label: "Furniture Timber", href: "/products/furniture-timber" },
      { label: "All Products", href: "/products" },
    ],
  },
  { label: "Custom Size", href: "/custom-size" },
  {
    label: "Applications",
    href: "/applications",
    children: [
      { label: "Furniture", href: "/applications#furniture" },
      { label: "Doors & Windows", href: "/applications#doors" },
      { label: "Interior Work", href: "/applications#interior" },
      { label: "Construction", href: "/applications#construction" },
      { label: "Commercial", href: "/applications#commercial" },
    ],
  },
  { label: "Process", href: "/process" },
  { label: "Gallery", href: "/portfolio" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Gallery", href: "/portfolio" },
    { label: "FAQ", href: "/faq" },
  ],
  products: [
    { label: "Teak Wood", href: "/products/teak-wood" },
    { label: "Hardwood", href: "/products/hardwood" },
    { label: "Softwood", href: "/products/softwood" },
    { label: "Sawn Timber", href: "/products/sawn-timber" },
    { label: "All Products", href: "/products" },
  ],
  services: [
    { label: "Custom Size Timber", href: "/custom-size" },
    { label: "Bulk & B2B Supply", href: "/quote" },
    { label: "Get a Quote", href: "/quote" },
    { label: "Applications", href: "/applications" },
  ],
};
