// @ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiExternalLink,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { BUSINESS } from "@/constants/business";
import styles from "./LocationMap.module.css";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

// ─── LocationMap ──────────────────────────────────────────────────────────────

interface LocationMapProps {
  className?: string;
}

export function LocationMap({ className = "" }: LocationMapProps) {
  return (
    <section className={`${styles.root} ${className}`} aria-label="Our Location">
      {/* Info strip above map */}
      <div className={styles.infoStrip}>
        <div className={styles.infoGrid}>
          {/* Address */}
          <motion.div
            className={styles.infoCard}
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className={styles.infoIcon} aria-hidden="true">
              <FiMapPin />
            </span>
            <div className={styles.infoContent}>
              <h3 className={styles.infoLabel}>Our Address</h3>
              <address className={styles.address}>
                {BUSINESS.address.line1},<br />
                {BUSINESS.address.line2},<br />
                {BUSINESS.address.city},<br />
                {BUSINESS.address.state} — {BUSINESS.address.pincode}
              </address>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            className={styles.infoCard}
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className={styles.infoIcon} aria-hidden="true">
              <FiPhone />
            </span>
            <div className={styles.infoContent}>
              <h3 className={styles.infoLabel}>Phone</h3>
              <a
                href={BUSINESS.phoneHref}
                className={styles.infoLink}
                aria-label={`Call ${BUSINESS.phoneFormatted}`}
              >
                {BUSINESS.phoneFormatted}
              </a>
            </div>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            className={styles.infoCard}
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className={`${styles.infoIcon} ${styles.infoIconWa}`} aria-hidden="true">
              <FaWhatsapp />
            </span>
            <div className={styles.infoContent}>
              <h3 className={styles.infoLabel}>WhatsApp</h3>
              <a
                href={BUSINESS.whatsappHref}
                className={`${styles.infoLink} ${styles.infoLinkWa}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                {BUSINESS.phoneFormatted}
              </a>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className={styles.ctaRow}
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnDirections}
            aria-label="Get directions to Surya Vijay Saw Mill on Google Maps"
          >
            <FiExternalLink aria-hidden="true" />
            <span>GET DIRECTIONS</span>
          </a>

          <a
            href={BUSINESS.phoneHref}
            className={styles.btnCall}
            aria-label={`Call ${BUSINESS.phoneFormatted}`}
          >
            <FiPhone aria-hidden="true" />
            <span>CALL NOW</span>
          </a>

          <a
            href={BUSINESS.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWhatsapp}
            aria-label="Message on WhatsApp"
          >
            <FaWhatsapp aria-hidden="true" />
            <span>WHATSAPP US</span>
          </a>
        </motion.div>
      </div>

      {/* Google Maps Embed */}
      <motion.div
        className={styles.mapWrapper}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <iframe
          src={BUSINESS.googleMapsEmbedUrl}
          className={styles.mapIframe}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Surya Vijay Saw Mill location on Google Maps"
          aria-label="Google Maps showing our location"
        />
        <div className={styles.mapOverlayHint} aria-hidden="true">
          <span>Click map to interact</span>
        </div>
      </motion.div>
    </section>
  );
}
