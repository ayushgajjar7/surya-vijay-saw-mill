"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { generateGeneralEnquiryUrl } from "@/utils/whatsapp";
import styles from "./WhatsAppButton.module.css";

export function WhatsAppButton() {
  const [isMobileBarVisible, setIsMobileBarVisible] = useState(false);

  useEffect(() => {
    function checkWidth() {
      setIsMobileBarVisible(window.innerWidth <= 768);
    }
    checkWidth();
    window.addEventListener("resize", checkWidth, { passive: true });
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  function handleClick() {
    window.open(generateGeneralEnquiryUrl(), "_blank", "noopener,noreferrer");
  }

  // Hide on mobile because MobileBottomBar already has WhatsApp link
  if (isMobileBarVisible) return null;

  return (
    <div className={styles.wrapper}>
      {/* Pulse ring */}
      <span className={styles.pulseRing} aria-hidden="true" />
      <button
        className={styles.button}
        onClick={handleClick}
        aria-label="Chat with us on WhatsApp"
        role="button"
        title="Chat with us"
      >
        <FaWhatsapp className={styles.icon} aria-hidden="true" />
      </button>
      <span className={styles.tooltip} role="tooltip">
        Chat with us
      </span>
    </div>
  );
}
