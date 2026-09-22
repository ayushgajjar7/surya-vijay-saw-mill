export function validateIndianPhone(phone: string): boolean {
  // Accept 10-digit Indian mobile numbers
  // Also accept with country code: +91, 91, 0
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  if (/^91\d{10}$/.test(cleaned)) return true;
  if (/^\d{10}$/.test(cleaned)) return true;
  return false;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function validateMaxLength(value: string, max: number): boolean {
  return value.trim().length <= max;
}

export function validateNumeric(value: string): boolean {
  return /^\d*\.?\d+$/.test(value.trim());
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function validateQuoteForm(data: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!validateRequired(data.name || "")) {
    errors.name = "Name is required";
  }

  if (!validateRequired(data.phone || "")) {
    errors.phone = "Phone number is required";
  } else if (!validateIndianPhone(data.phone || "")) {
    errors.phone = "Please enter a valid 10-digit mobile number";
  }

  if (!validateRequired(data.woodType || "")) {
    errors.woodType = "Please specify wood type";
  }

  if (!validateRequired(data.quantity || "")) {
    errors.quantity = "Quantity is required";
  }

  if (data.email && data.email.trim() && !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
}

export function validateContactForm(data: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!validateRequired(data.name || "")) {
    errors.name = "Name is required";
  }

  if (!validateRequired(data.phone || "")) {
    errors.phone = "Phone number is required";
  } else if (!validateIndianPhone(data.phone || "")) {
    errors.phone = "Please enter a valid 10-digit mobile number";
  }

  if (!validateRequired(data.message || "")) {
    errors.message = "Message is required";
  }

  if (data.email && data.email.trim() && !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
}
