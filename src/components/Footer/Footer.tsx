"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaDirections,
} from "react-icons/fa";

import { BUSINESS } from "@/constants/business";
import { FOOTER_LINKS } from "@/constants/navigation";
import { Images } from "@/constants/images";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { Button } from "@/components/Button/Button";
import styles from "./Footer.module.css";

/* ---- "Coming soon" social icon with tooltip ---- */
interface SocialPlaceholderProps {
  icon: React.ReactNode;
  name: string;
}

function SocialPlaceholder({ icon, name }: SocialPlaceholderProps) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className={styles.socialWrapper}>
      <button
        type="button"
        className={styles.socialIcon}
        aria-label={`${name} — Coming soon`}
        aria-describedby={showTip ? `tip-${name}` : undefined}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onFocus={() => setShowTip(true)}
        onBlur={() => setShowTip(false)}
        disabled
      >
        {icon}
      </button>

      {showTip && (
        <motion.div
          id={`tip-${name}`}
          className={styles.tooltip}
          role="tooltip"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          Coming soon
        </motion.div>
      )}
    </div>
  );
}

/* ---- Footer link column ---- */
interface FooterColumnProps {
  heading: string;
  links: { label: string; href: string }[];
}

function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div className={styles.column}>
      <h3 className={styles.columnHeading}>{heading}</h3>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={styles.footerLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- Main Footer ---- */
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer} aria-label="Site footer">
      {/* ============ Top section ============ */}
      <div className={styles.top}>
        <div className={styles.container}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLogo} aria-label="Surya Vijay Saw Mill — Home">
              <Image
                src={Images.logo}
                alt="Surya Vijay Saw Mill"
                width={200}
                height={200}
                className={styles.brandLogoImg}
                style={{ width: "auto", height: "80px", objectFit: "contain" }}
              />
            </Link>

            <p className={styles.brandDesc}>{t.footer.description}</p>

            {/* Contact info */}
            <address className={styles.contactBlock}>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                aria-label="View address on Google Maps"
              >
                <FaMapMarkerAlt className={styles.contactIcon} aria-hidden="true" />
                <span>
                  {BUSINESS.address.line1},{" "}
                  {BUSINESS.address.line2},{" "}
                  {BUSINESS.address.city},{" "}
                  {BUSINESS.address.state} — {BUSINESS.address.pincode}
                </span>
              </a>

              <a
                href={BUSINESS.phoneHref}
                className={styles.contactItem}
                aria-label={`Call ${BUSINESS.phoneFormatted}`}
              >
                <FaPhone className={styles.contactIcon} aria-hidden="true" />
                <span>{BUSINESS.phoneFormatted}</span>
              </a>

              <a
                href={BUSINESS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp className={styles.contactIcon} aria-hidden="true" />
                <span>WhatsApp: {BUSINESS.phoneFormatted}</span>
              </a>

              <a
                href={`mailto:${BUSINESS.email}`}
                className={styles.contactItem}
                aria-label={`Send email to ${BUSINESS.email}`}
              >
                <FaEnvelope className={styles.contactIcon} aria-hidden="true" />
                <span>{BUSINESS.email}</span>
              </a>
            </address>

            {/* Get Directions CTA */}
            <Button
              variant="outline"
              size="sm"
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              className={styles.directionsBtn}
              aria-label="Get directions to Surya Vijay Saw Mill on Google Maps"
            >
              <FaDirections aria-hidden="true" style={{ marginRight: "0.3rem" }} />
              {t.cta.getDirections}
            </Button>
          </div>

          {/* ---- Link columns ---- */}
          <FooterColumn heading={t.footer.company} links={FOOTER_LINKS.company} />
          <FooterColumn heading={t.footer.products} links={FOOTER_LINKS.products} />
          <FooterColumn heading={t.footer.services} links={FOOTER_LINKS.services} />
        </div>
      </div>

      {/* ============ Bottom bar ============ */}
      <div className={styles.bottom}>
        <div className={styles.bottomContainer}>
          {/* Copyright */}
          <p className={styles.copyright}>{t.footer.copyright}</p>

          {/* Made with care */}
          <p className={styles.madeWith}>
            Designed with care for{" "}
            <span className={styles.madeWithBrand}>{BUSINESS.name}</span>
          </p>

          {/* Social + Utilities */}
          <div className={styles.bottomRight}>
            {/* Social placeholders */}
            <div className={styles.socials} aria-label="Social media links">
              <SocialPlaceholder icon={<FaInstagram />} name="Instagram" />
              <SocialPlaceholder icon={<FaFacebook />} name="Facebook" />
            </div>

            {/* Theme + Language */}
            <div className={styles.utilities}>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
