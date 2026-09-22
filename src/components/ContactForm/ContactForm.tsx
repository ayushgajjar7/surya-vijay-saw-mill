"use client";

import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import { Button } from "@/components/Button/Button";
import { validateContactForm } from "@/utils/validation";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
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
        <h3>Message Sent</h3>
        <p>Thank you for reaching out. We will get back to you shortly.</p>
        <Button variant="primary" onClick={() => setStatus("idle")}>Send Another Message</Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? styles.inputError : ""}
        ></textarea>
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      {status === "error" && (
        <div className={styles.formError}>
          Something went wrong. Please try again.
        </div>
      )}

      <div className={styles.actions}>
        <Button variant="primary" type="submit" loading={status === "loading"}>
          SEND MESSAGE
        </Button>
      </div>
    </form>
  );
}
