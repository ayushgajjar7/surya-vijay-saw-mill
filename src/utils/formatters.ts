import { BUSINESS } from "@/constants/business";

export function formatPhoneForDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

export function formatDimension(
  length: string,
  width: string,
  thickness: string,
  unit: string
): string {
  const parts = [
    length ? `${length}${unit}` : null,
    width ? `${width}"` : null,
    thickness ? `${thickness}"` : null,
  ].filter(Boolean);
  return parts.join(" × ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getSiteUrl(): string {
  return BUSINESS.siteUrl;
}

export function getPageUrl(path: string): string {
  return `${BUSINESS.siteUrl}${path}`;
}
