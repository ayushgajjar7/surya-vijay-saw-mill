"use client";

import React, { useState } from "react";
import styles from "./QuoteForm.module.css";
import { Button } from "@/components/Button/Button";
import { validateQuoteForm } from "@/utils/validation";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

interface QuoteFormProps {
  isCustomSize?: boolean;
}

export function QuoteForm({ isCustomSize = false }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    woodType: "",
    length: "",
    width: "",
    thickness: "",
    unit: "ft",
    quantity: "",
    purpose: "",
    deliveryLocation: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleWhatsApp = () => {
    const validationErrors = validateQuoteForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const url = generateWhatsAppUrl(formData);
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateQuoteForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>✓</div>
        <h3>Requirement Received</h3>
        <p>Thank you. Our team will review your requirement and contact you regarding availability and pricing.</p>
        <Button variant="primary" onClick={() => setStatus("idle")}>Submit Another Request</Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.inputError : ""}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? styles.inputError : ""}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="email">Email (Optional)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="woodType">Wood Type *</label>
          <input
            type="text"
            id="woodType"
            name="woodType"
            placeholder="e.g. Teak Wood, Hardwood"
            value={formData.woodType}
            onChange={handleChange}
            className={errors.woodType ? styles.inputError : ""}
          />
          {errors.woodType && <span className={styles.errorText}>{errors.woodType}</span>}
        </div>
      </div>

      <div className={styles.dimensionsBox}>
        <h4>Dimensions (Optional)</h4>
        <div className={styles.dimensionsGrid}>
          <div className={styles.fieldGroup}>
            <label htmlFor="length">Length</label>
            <input type="number" id="length" name="length" value={formData.length} onChange={handleChange} />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="width">Width</label>
            <input type="number" id="width" name="width" value={formData.width} onChange={handleChange} />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="thickness">Thickness</label>
            <input type="number" id="thickness" name="thickness" value={formData.thickness} onChange={handleChange} />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="unit">Unit</label>
            <select id="unit" name="unit" value={formData.unit} onChange={handleChange} style={{ width: '100%' }}>
              <option value="ft">Feet (ft)</option>
              <option value="inch">Inches (in)</option>
              <option value="mm">MM</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="quantity">Quantity *</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            placeholder="e.g. 50 pieces, 100 sq ft"
            value={formData.quantity}
            onChange={handleChange}
            className={errors.quantity ? styles.inputError : ""}
          />
          {errors.quantity && <span className={styles.errorText}>{errors.quantity}</span>}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="purpose">Purpose (Optional)</label>
          <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange}>
            <option value="">Select Purpose</option>
            <option value="Furniture">Furniture</option>
            <option value="Doors">Doors</option>
            <option value="Windows">Windows</option>
            <option value="Construction">Construction</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="deliveryLocation">Delivery Location (Optional)</label>
        <input type="text" id="deliveryLocation" name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="message">Additional Requirements</label>
        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange}></textarea>
      </div>

      {status === "error" && (
        <div className={styles.formError}>
          Something went wrong. Please try again or WhatsApp us directly.
        </div>
      )}

      <div className={styles.actions}>
        <Button variant="primary" type="submit" loading={status === "loading"}>
          REQUEST A QUOTE
        </Button>
        <span className={styles.or}>OR</span>
        <Button variant="whatsapp" type="button" onClick={handleWhatsApp}>
          SEND ON WHATSAPP
        </Button>
      </div>
    </form>
  );
}
