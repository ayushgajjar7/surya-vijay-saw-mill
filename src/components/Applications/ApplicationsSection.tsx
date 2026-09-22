"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import styles from "./ApplicationsSection.module.css";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { APPLICATIONS } from "@/data/applications";

export function ApplicationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className={styles.section} id="applications">
      <div className={`container ${styles.container}`}>
        <SectionTitle
          eyebrow="Applications"
          heading="Wood For Every Requirement"
          subheading="Timber suitable for furniture, doors, construction and interior applications."
          align="center"
        />

        <div className={styles.grid} ref={ref}>
          {APPLICATIONS.map((app, index) => (
            <motion.div
              key={app.id}
              className={styles.cardWrapper}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/applications#${app.id}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={app.image}
                    alt={app.name}
                    fill
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.exploreText}>EXPLORE</span>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <span className={styles.icon}>{app.icon}</span>
                    <h3 className={styles.title}>{app.name}</h3>
                  </div>
                  <p className={styles.description}>{app.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
