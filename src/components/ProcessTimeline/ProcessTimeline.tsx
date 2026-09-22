"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ProcessTimeline.module.css";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";

export function ProcessTimeline() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className={styles.section} id="process">
      <div className={`container ${styles.container}`}>
        <SectionTitle
          eyebrow="Process"
          heading={t.process.heading}
          subheading={t.process.subheading}
          align="center"
        />

        <div className={styles.timeline} ref={ref}>
          {t.process.steps.map((step, index) => (
            <motion.div
              key={index}
              className={styles.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.number}>{step.step}</div>
              <div className={styles.content}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
              {index < t.process.steps.length - 1 && (
                <div className={styles.connector} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
