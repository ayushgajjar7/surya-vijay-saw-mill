// @ts-nocheck
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center" | "right";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      delay,
    },
  }),
};

export function SectionTitle({
  eyebrow,
  heading,
  subheading,
  align = "center",
  className = "",
  as: Heading = "h2",
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div
      ref={ref}
      className={[
        styles.sectionTitle,
        styles[`align--${align}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <motion.div
          className={styles.eyebrowWrapper}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <span className={styles.line} aria-hidden="true" />
          <span className={styles.eyebrow}>{eyebrow}</span>
          <span className={styles.line} aria-hidden="true" />
        </motion.div>
      )}

      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={eyebrow ? 0.12 : 0}
      >
        <Heading className={styles.heading}>{heading}</Heading>
      </motion.div>

      {subheading && (
        <motion.p
          className={styles.subheading}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={eyebrow ? 0.22 : 0.1}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}
