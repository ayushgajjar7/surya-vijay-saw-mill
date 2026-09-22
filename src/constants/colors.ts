export const Colors = {
  light: {
    background: "#F7F3ED",
    surface: "#EFE8DE",
    card: "#FFFFFF",
    text: "#29231D",
    textMuted: "#6B5A4E",
    heading: "#17130F",

    primary: "#8B5E34",
    primaryHover: "#7A5230",
    secondary: "#5A3A22",
    accent: "#C29A5B",
    accentLight: "#D4B07A",

    border: "#DED4C7",
    borderLight: "#EDE6DC",

    glass: "rgba(255,255,255,0.65)",
    glassStrong: "rgba(255,255,255,0.85)",
    overlay: "rgba(23, 19, 15, 0.55)",

    success: "#4A7C59",
    error: "#C0392B",
    warning: "#D4A017",

    whatsapp: "#25D366",
    whatsappHover: "#1EBE5D",
  },

  dark: {
    background: "#11100E",
    surface: "#1B1815",
    card: "#24201B",
    text: "#EDE5DA",
    textMuted: "#9E8E7E",
    heading: "#FFFFFF",

    primary: "#B8864A",
    primaryHover: "#C99555",
    secondary: "#D0A66A",
    accent: "#E0BE83",
    accentLight: "#EAD09E",

    border: "#3A332B",
    borderLight: "#2E2820",

    glass: "rgba(30,27,23,0.70)",
    glassStrong: "rgba(30,27,23,0.90)",
    overlay: "rgba(0, 0, 0, 0.65)",

    success: "#5A9E6F",
    error: "#E74C3C",
    warning: "#E0C030",

    whatsapp: "#25D366",
    whatsappHover: "#1EBE5D",
  },
} as const;

export type ColorTheme = keyof typeof Colors;
export type ThemeColors = (typeof Colors)[ColorTheme];
