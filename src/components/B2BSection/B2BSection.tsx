"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./B2BSection.module.css";
import { Button } from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { BUSINESS } from "@/constants/business";
import { generateBulkEnquiryUrl } from "@/utils/whatsapp";

export function B2BSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section} id="b2b">
      <div className={`container ${styles.container}`} ref={ref}>
        <motion.div 
          className={styles.contentLeft}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>B2B & BULK</span>
          <h2 className={styles.heading}>{t.b2b.heading}</h2>
          <p className={styles.subheading}>{t.b2b.subheading}</p>
          <p className={styles.description}>{t.b2b.description}</p>
          
          <div className={styles.actions}>
            <Button 
              variant="whatsapp" 
              onClick={() => window.open(generateBulkEnquiryUrl(), '_blank')}
            >
              {t.b2b.ctaButton}
            </Button>
          </div>
        </motion.div>

        <motion.div 
          className={styles.contentRight}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ul className={styles.targetList}>
            {t.b2b.targets.map((target, idx) => (
              <li key={idx} className={styles.targetItem}>
                <span className={styles.checkIcon}>✓</span>
                {target}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
