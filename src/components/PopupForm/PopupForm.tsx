// @ts-nocheck
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaWhatsapp, FaFileAlt } from "react-icons/fa";
import { generateGeneralEnquiryUrl } from "@/utils/whatsapp";
import styles from "./PopupForm.module.css";

const STORAGE_KEY = "svsm-popup-closed-at";
const SHOW_DELAY_MS = 3000;
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappUrl = generateGeneralEnquiryUrl();

  // Determine if we should show the popup
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const closedAt = localStorage.getItem(STORAGE_KEY);
        if (closedAt) {
          const elapsed = Date.now() - parseInt(closedAt, 10);
          if (elapsed < COOLDOWN_MS) return; // within 24h cooldown
        }
        setIsOpen(true);
      } catch {
        // localStorage unavailable
        setIsOpen(true);
      }
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setIsOpen(false);
  }, []);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closePopup();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closePopup]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    // Focus the close button on open
    closeButtonRef.current?.focus();

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        modal!.querySelectorAll<HTMLElement>(focusableSelectors)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePopup}
            aria-hidden="true"
            ref={overlayRef}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-heading"
            aria-describedby="popup-subheading"
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              className={styles.closeBtn}
              onClick={closePopup}
              aria-label="Close popup"
            >
              <FaTimes aria-hidden="true" />
            </button>

            {/* Decorative wood grain bar */}
            <div className={styles.topBar} aria-hidden="true" />

            {/* Content */}
            <div className={styles.content}>
              <h2 className={styles.heading} id="popup-heading">
                Looking for the right timber?
              </h2>
              <p className={styles.subheading} id="popup-subheading">
                Tell us your wood type, size and quantity — we'll help you find
                exactly what you need.
              </p>

              <div className={styles.actions}>
                <Link
                  href="/quote"
                  className={styles.quoteBtn}
                  onClick={closePopup}
                  aria-label="Get a timber quote"
                >
                  <FaFileAlt aria-hidden="true" />
                  GET A QUOTE
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waBtn}
                  onClick={closePopup}
                  aria-label="Chat with us on WhatsApp"
                >
                  <FaWhatsapp aria-hidden="true" />
                  WHATSAPP US
                </a>
              </div>

              <button
                className={styles.dismissText}
                onClick={closePopup}
                aria-label="Dismiss popup"
              >
                No thanks, I'll browse on my own
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
