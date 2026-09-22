"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./WhyChooseUs.module.css";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className={styles.section} id="why-choose-us">
      <div className={`container ${styles.container}`}>
        <SectionTitle
          eyebrow="Why Choose Us"
          heading={t.whyUs.heading}
          subheading={t.whyUs.subheading}
          align="center"
        />

        <div className={styles.grid} ref={ref}>
          {t.whyUs.reasons.map((reason, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>
                  {index === 0 ? "🏆" : index === 1 ? "🌲" : index === 2 ? "✂️" : index === 3 ? "📦" : index === 4 ? "🚚" : index === 5 ? "🤝" : "📍"}
                </span>
              </div>
              <h3 className={styles.title}>{reason.title}</h3>
              <p className={styles.description}>{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
