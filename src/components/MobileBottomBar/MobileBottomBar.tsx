// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp, FaFileAlt } from "react-icons/fa";
import { BUSINESS } from "@/constants/business";
import { generateGeneralEnquiryUrl } from "@/utils/whatsapp";
import styles from "./MobileBottomBar.module.css";

export function MobileBottomBar() {
  const whatsappUrl = generateGeneralEnquiryUrl();

  return (
    <nav
      className={styles.bar}
      aria-label="Mobile quick actions"
      role="navigation"
    >
      {/* CALL */}
      <a
        href={BUSINESS.phoneHref}
        className={`${styles.item} ${styles.callItem}`}
        aria-label={`Call us at ${BUSINESS.phoneFormatted}`}
      >
        <FaPhoneAlt className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>Call</span>
      </a>

      {/* Divider */}
      <span className={styles.divider} aria-hidden="true" />

      {/* WHATSAPP */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.item} ${styles.waItem}`}
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>WhatsApp</span>
      </a>

      {/* Divider */}
      <span className={styles.divider} aria-hidden="true" />

      {/* GET QUOTE */}
      <Link
        href="/quote"
        className={`${styles.item} ${styles.quoteItem}`}
        aria-label="Get a timber quote"
      >
        <FaFileAlt className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>Get Quote</span>
      </Link>
    </nav>
  );
}
