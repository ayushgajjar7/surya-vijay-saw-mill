import { WhatsAppMessageData } from "@/types";
import { BUSINESS } from "@/constants/business";

export function generateWhatsAppUrl(data: WhatsAppMessageData): string {
  const lines: string[] = [];

  lines.push(`Hello ${BUSINESS.name},`);
  lines.push("");

  if (data.woodType) {
    lines.push(`I am interested in ${data.woodType}.`);
    lines.push("");
    lines.push(`Wood Type: ${data.woodType}`);
  }

  const hasDimensions = data.length || data.width || data.thickness;
  if (hasDimensions) {
    const unit = data.unit || "ft";
    const dims = [
      data.length ? `${data.length} ${unit}` : null,
      data.width ? `${data.width}"` : null,
      data.thickness ? `${data.thickness}"` : null,
    ]
      .filter(Boolean)
      .join(" × ");

    if (dims) {
      lines.push(`Size: ${dims}`);
    }
  }

  if (data.quantity) {
    lines.push(`Quantity: ${data.quantity}`);
  }

  if (data.deliveryLocation) {
    lines.push(`Delivery Location: ${data.deliveryLocation}`);
  }

  if (data.purpose) {
    lines.push(`Purpose: ${data.purpose}`);
  }

  if (data.message) {
    lines.push("");
    lines.push(`Notes: ${data.message}`);
  }

  lines.push("");
  lines.push("Please share availability and price.");
  lines.push("");
  lines.push("Thank you.");

  if (data.name) {
    lines.push(`- ${data.name}`);
  }

  const message = lines.join("\n");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodedMessage}`;
}

export function generateProductEnquiryUrl(productName: string): string {
  const message = `Hello ${BUSINESS.name},\n\nI would like to enquire about ${productName}.\n\nPlease share availability and current price.\n\nThank you.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodedMessage}`;
}

export function generateBulkEnquiryUrl(): string {
  const message = `Hello ${BUSINESS.name},\n\nI have a bulk timber requirement.\n\nPlease let me know your availability and pricing.\n\nThank you.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodedMessage}`;
}

export function generateGeneralEnquiryUrl(): string {
  const message = `Hello ${BUSINESS.name},\n\nI would like to enquire about timber availability.\n\nThank you.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodedMessage}`;
}

export function generateContactWhatsAppUrl(): string {
  const message = `Hello ${BUSINESS.name},\n\nI would like to get in touch regarding timber requirements.\n\nThank you.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodedMessage}`;
}
