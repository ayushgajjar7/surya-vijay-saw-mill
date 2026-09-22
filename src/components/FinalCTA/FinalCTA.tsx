"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import styles from "./FinalCTA.module.css";
import { Button } from "@/components/Button/Button";
import { BUSINESS } from "@/constants/business";
import { generateGeneralEnquiryUrl } from "@/utils/whatsapp";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section} id="cta">
      <div className={styles.bgOverlay} />
      <div className={`container ${styles.container}`} ref={ref}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>Tell Us What You Need.</h2>
          <p className={styles.subheading}>
            Wood type. Size. Quantity. Send us your requirement and we'll help
            with availability and pricing.
          </p>
          <div className={styles.actions}>
            <Link href="/quote" tabIndex={-1}>
              <Button variant="primary" size="lg">
                GET A QUOTE
              </Button>
            </Link>
            <Button
              variant="whatsapp"
              size="lg"
              onClick={() => window.open(generateGeneralEnquiryUrl(), "_blank")}
            >
              <FaWhatsapp size={20} /> WHATSAPP US
            </Button>
            <a href={BUSINESS.phoneHref} tabIndex={-1}>
              <Button variant="outline" size="lg" className={styles.callButton}>
                <FaPhone size={16} /> CALL NOW
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
