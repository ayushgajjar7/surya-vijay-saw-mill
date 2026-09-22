// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp, FaArrowRight, FaCut } from "react-icons/fa";
import type { Product } from "@/types";
import { generateProductEnquiryUrl } from "@/utils/whatsapp";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  showEnquiryButton?: boolean;
}

export function ProductCard({
  product,
  showEnquiryButton = true,
}: ProductCardProps) {
  const enquiryUrl = generateProductEnquiryUrl(product.name);

  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      aria-label={`Product: ${product.name}`}
    >
      {/* Image wrapper */}
      <div className={styles.imageWrapper}>
        <motion.div
          className={styles.imageInner}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
            priority={product.featured}
          />
        </motion.div>

        {/* Category badge */}
        <span className={styles.categoryBadge} aria-label={`Category: ${product.category}`}>
          {product.category}
        </span>

        {/* Custom cutting badge */}
        {product.customCutting && (
          <span className={styles.customCuttingBadge} aria-label="Custom cutting available">
            <FaCut aria-hidden="true" />
            Custom Cutting
          </span>
        )}
      </div>

      {/* Card body */}
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.shortDescription}</p>

        {/* Pricing note */}
        <p className={styles.pricingNote} aria-label="Pricing information">
          No fixed price — contact us for current rates
        </p>

        {/* Actions */}
        <div className={styles.actions}>
          <Link
            href={`/products/${product.slug}`}
            className={styles.exploreBtn}
            aria-label={`Explore ${product.name}`}
          >
            Explore
            <FaArrowRight className={styles.arrowIcon} aria-hidden="true" />
          </Link>

          {showEnquiryButton && (
            <a
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.enquireBtn}
              aria-label={`Enquire about ${product.name} on WhatsApp`}
            >
              <FaWhatsapp className={styles.waIcon} aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
