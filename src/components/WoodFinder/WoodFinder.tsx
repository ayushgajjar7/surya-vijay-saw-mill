// @ts-nocheck
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { PRODUCTS } from "@/data/products";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import styles from "./WoodFinder.module.css";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface FinderCard {
  id: string;
  label: string;
  icon: string;
  description: string;
  suggestedSlugs: string[];
}

const FINDER_CARDS: FinderCard[] = [
  {
    id: "furniture",
    label: "Furniture",
    icon: "🪑",
    description: "Wardrobes, beds, tables, sofas and cabinets",
    suggestedSlugs: ["teak-wood", "hardwood", "furniture-timber", "cut-to-size-timber"],
  },
  {
    id: "doors",
    label: "Doors",
    icon: "🚪",
    description: "Door frames, shutters and panels",
    suggestedSlugs: ["door-window-timber", "teak-wood", "hardwood", "cut-to-size-timber"],
  },
  {
    id: "windows",
    label: "Windows",
    icon: "🪟",
    description: "Window frames and associated carpentry",
    suggestedSlugs: ["door-window-timber", "teak-wood", "hardwood"],
  },
  {
    id: "interior",
    label: "Interior",
    icon: "🏠",
    description: "Paneling, false ceilings and decorative work",
    suggestedSlugs: ["teak-wood", "hardwood", "furniture-timber", "cut-to-size-timber"],
  },
  {
    id: "construction",
    label: "Construction",
    icon: "🏗️",
    description: "Formwork, scaffolding and structural framing",
    suggestedSlugs: ["construction-timber", "sawn-timber", "softwood", "timber-logs"],
  },
  {
    id: "custom",
    label: "Custom Requirement",
    icon: "✂️",
    description: "Specific dimensions or other wood requirements",
    suggestedSlugs: ["cut-to-size-timber", "other-requirements"],
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const panelVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.45 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function WoodFinder() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const activeCard = FINDER_CARDS.find((c) => c.id === activeId) ?? null;

  const suggestedProducts = activeCard
    ? activeCard.suggestedSlugs
        .map((slug) => PRODUCTS.find((p) => p.slug === slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    : [];

  const waUrl = activeCard
    ? generateWhatsAppUrl({
        purpose: activeCard.label,
        message: `I need timber suitable for ${activeCard.label.toLowerCase()} work.`,
      })
    : generateWhatsAppUrl({});

  const handleCardClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section} aria-label="Wood Finder">
      <div className={styles.container}>
        <SectionTitle
          eyebrow="Wood Finder"
          heading="What Are You Looking For?"
          subheading="Select your requirement and we'll suggest the right timber for you."
          align="center"
        />

        {/* Cards grid */}
        <motion.div
          ref={ref}
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          role="list"
          aria-label="Requirement categories"
        >
          {FINDER_CARDS.map((card) => {
            const isActive = activeId === card.id;
            return (
              <motion.button
                key={card.id}
                role="listitem"
                className={[styles.card, isActive ? styles.cardActive : ""].join(" ")}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(card.id)}
                aria-pressed={isActive}
                aria-expanded={isActive}
                aria-controls={`finder-panel-${card.id}`}
                type="button"
              >
                <span className={styles.cardIcon} aria-hidden="true">
                  {card.icon}
                </span>
                <span className={styles.cardLabel}>{card.label}</span>
                <span className={styles.cardDesc}>{card.description}</span>
                <span className={styles.cardChevron} aria-hidden="true">
                  {isActive ? "▲" : "▼"}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Suggestion panel */}
        <AnimatePresence mode="wait">
          {activeCard && (
            <motion.div
              key={activeCard.id}
              id={`finder-panel-${activeCard.id}`}
              className={styles.panel}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="region"
              aria-label={`Suggestions for ${activeCard.label}`}
            >
              <div className={styles.panelInner}>
                <p className={styles.panelHeading}>
                  Suitable timber for{" "}
                  <span className={styles.panelHighlight}>{activeCard.label}</span>:
                </p>

                <div className={styles.suggestions}>
                  {suggestedProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className={styles.suggestion}
                    >
                      <span className={styles.suggestionName}>{product.name}</span>
                      <span className={styles.suggestionDesc}>
                        {product.shortDescription}
                      </span>
                      <span className={styles.suggestionArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ))}
                </div>

                <div className={styles.panelCta}>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waButton}
                    aria-label={`Ask on WhatsApp about ${activeCard.label} timber`}
                  >
                    <span aria-hidden="true">💬</span>
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
